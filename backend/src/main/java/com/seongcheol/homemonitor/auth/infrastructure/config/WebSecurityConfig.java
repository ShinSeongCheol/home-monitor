package com.seongcheol.homemonitor.auth.infrastructure.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.seongcheol.homemonitor.auth.infrastructure.security.AccessDeniedHandlerComponent;
import com.seongcheol.homemonitor.auth.infrastructure.security.AuthenticationEntryPointComponent;
import com.seongcheol.homemonitor.auth.infrastructure.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	private final JwtAuthenticationFilter jwtFilter;

	private final AuthenticationEntryPointComponent AuthenticationEntryPointComponent;
	
	private final AccessDeniedHandlerComponent accessDeniedHandlerComponent;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
			.csrf(csrf -> csrf.disable())
			.headers(header -> header.frameOptions(frame -> frame.sameOrigin()))
			.formLogin(formLogin -> formLogin.disable())
			.httpBasic(httpBasic -> httpBasic.disable())
			.logout(httpLogout -> httpLogout.disable())
		;

		http
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		;

		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		http.exceptionHandling((exceptionHandling) -> exceptionHandling.authenticationEntryPoint(AuthenticationEntryPointComponent).accessDeniedHandler(accessDeniedHandlerComponent));

		http
            .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
				.requestMatchers("/api/v1/boards/*/post").authenticated()
				.requestMatchers(HttpMethod.POST, "/api/v1/boards/**").authenticated()
				.requestMatchers(HttpMethod.PUT, "/api/v1/boards/**").authenticated()
				.requestMatchers(HttpMethod.DELETE, "/api/v1/boards/**").authenticated()
				.requestMatchers("/api/v1/forecast/region/**").permitAll()
				.requestMatchers("/api/v1/forecast/**").hasRole("ADMIN")
				.requestMatchers("/api/v1/member/signup").permitAll()
				.requestMatchers("/api/v1/member/**").authenticated()
				.anyRequest().permitAll()
			)
		;

        return http.build();
    }

}
