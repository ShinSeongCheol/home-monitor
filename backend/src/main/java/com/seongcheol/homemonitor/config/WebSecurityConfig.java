package com.seongcheol.homemonitor.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.seongcheol.filter.JwtFilter;
import com.seongcheol.homemonitor.components.AuthenticationEntryPointComponent;
import com.seongcheol.homemonitor.components.JwtUtilComponent;
import com.seongcheol.homemonitor.service.UserDetailServiceImpl;
import com.seongcheol.homemonitor.components.AccessDeniedHandlerComponent;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public JwtFilter jwtFilter() {
		return new JwtFilter(userDetailServiceImpl, jwtUtilComponent);
	}

	@Autowired
	private UserDetailServiceImpl userDetailServiceImpl;

	@Autowired
	private JwtUtilComponent jwtUtilComponent;

	@Autowired
	private AuthenticationEntryPointComponent AuthenticationEntryPointComponent;
	
	@Autowired
	private AccessDeniedHandlerComponent accessDeniedHandlerComponent;

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

		http.addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
		http.exceptionHandling((exceptionHandling) -> exceptionHandling.authenticationEntryPoint(AuthenticationEntryPointComponent).accessDeniedHandler(accessDeniedHandlerComponent));

		http
            .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
				.requestMatchers("/api/v1/forecast/**").hasRole("ADMIN")
				.requestMatchers("/api/v1/member/signup").permitAll()
				.requestMatchers("/api/v1/member/**").authenticated()
				.anyRequest().permitAll()
			)
		;

        return http.build();
    }

}
