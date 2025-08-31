package com.seongcheol.homemonitor.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.components.JwtUtilComponent;
import com.seongcheol.homemonitor.dto.LoginRequestDto;
import com.seongcheol.homemonitor.dto.LoginResponseDto;
import com.seongcheol.homemonitor.dto.MemberDto;
import com.seongcheol.homemonitor.dto.UserDetailsImpl;

@Service
public class AuthService {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtilComponent jwtUtilComponent;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());
            Authentication authentication = authenticationManager.authenticate(token);
            
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();

            MemberDto memberDto = MemberDto.builder().email(user.getEmail()).build();

            String accessToken = jwtUtilComponent.createAccessToken(memberDto);

            LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .email(user.getEmail())
                .name(user.getUsername())
                .accessToken(accessToken)
                .authorities(user.getAuthorities())
                .build()
            ;

            return loginResponseDto;

        } catch (AuthenticationException e) {
            throw new BadCredentialsException(e.getMessage());
        }
    }

    public LoginResponseDto getAuth() {

        LoginResponseDto.LoginResponseDtoBuilder loginResponseDtoBuilder = LoginResponseDto.builder();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {

            UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
            loginResponseDtoBuilder.email(user.getEmail());
            loginResponseDtoBuilder.name(user.getUsername());
            loginResponseDtoBuilder.authorities(user.getAuthorities());
        }

        LoginResponseDto loginResponseDto = loginResponseDtoBuilder.build();
        return loginResponseDto;
    }

}
