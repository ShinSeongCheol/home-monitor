package com.seongcheol.homemonitor.auth.application.service;

import com.seongcheol.homemonitor.auth.application.command.GetAuthCommand;
import com.seongcheol.homemonitor.auth.application.command.LoginKakaoCommand;
import com.seongcheol.homemonitor.auth.application.command.LoginLocalCommand;
import com.seongcheol.homemonitor.auth.application.port.in.AuthPort;
import com.seongcheol.homemonitor.auth.application.result.GetAuthResult;
import com.seongcheol.homemonitor.auth.application.result.LoginKakaoResult;
import com.seongcheol.homemonitor.auth.application.result.LoginLocalResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.auth.infrastructure.security.JwtProvider;
import com.seongcheol.homemonitor.auth.infrastructure.security.UserDetailsImpl;
import com.seongcheol.homemonitor.dto.response.LoginResponseDto;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthUseCase implements AuthPort {
    
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtUtilComponent;

    @Override
    public LoginLocalResult loginLocal(LoginLocalCommand loginLocalCommand) {
        log.debug("유저 로그인 서비스");
        try {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginLocalCommand.email(), loginLocalCommand.password());
            Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

            UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
            String accessToken = jwtUtilComponent.createAccessToken(user.getEmail(), user.getUsername());

            return null;
//            return new LoginLocalResult(user.getEmail(), user.getUsername(), accessToken, user.getAuthorities());

        } catch (AuthenticationException e) {
            throw new BadCredentialsException(e.getMessage());
        }
    }

    @Override
    public LoginKakaoResult loginKakao(LoginKakaoCommand loginKakaoCommand) {
//        return new LoginKakaoResult();
        return null;
    }

    @Override
    public GetAuthResult getAuth(GetAuthCommand getAuthCommand) {
        log.debug("유저 인증 정보 조회 서비스");
        LoginResponseDto.LoginResponseDtoBuilder loginResponseDtoBuilder = LoginResponseDto.builder();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
            loginResponseDtoBuilder.email(user.getEmail());
            loginResponseDtoBuilder.name(user.getUsername());
//            loginResponseDtoBuilder.authorities(user.getAuthorities());
        }

        return new GetAuthResult();
    }

}
