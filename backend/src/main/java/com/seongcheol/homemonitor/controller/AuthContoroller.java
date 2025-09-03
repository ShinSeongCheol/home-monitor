package com.seongcheol.homemonitor.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.KaKaoAuthorizeDto;
import com.seongcheol.homemonitor.dto.LoginRequestDto;
import com.seongcheol.homemonitor.dto.LoginResponseDto;
import com.seongcheol.homemonitor.service.AuthService;
import com.seongcheol.homemonitor.service.KakaoService;


import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/v1/auth")
public class AuthContoroller {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private AuthService authService;

    @Autowired
    private KakaoService kakaoService;

    @GetMapping
    public ResponseEntity<LoginResponseDto> getAuth() {

        LoginResponseDto loginResponseDto = authService.getAuth();

        return ResponseEntity.ok(loginResponseDto);
    }
    

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        logger.debug("유저 로그인 컨트롤러 요청");
        LoginResponseDto loginResponseDto = authService.login(loginRequestDto);
        return ResponseEntity.ok(loginResponseDto);
    }

    @PostMapping("/kakao")
    public ResponseEntity<LoginResponseDto> kakaoLogin(@RequestBody KaKaoAuthorizeDto kaKaoAuthorizeDto) {
        logger.debug("카카오 로그인 컨트롤러 요청");
        LoginResponseDto loginResponseDto = kakaoService.login(kaKaoAuthorizeDto);
        return ResponseEntity.ok(loginResponseDto);
    }

}
