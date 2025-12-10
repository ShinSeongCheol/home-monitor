package com.seongcheol.homemonitor.auth.api;

import com.seongcheol.homemonitor.dto.request.KaKaoAuthorizeRequestDto;
import com.seongcheol.homemonitor.dto.request.LoginRequestDto;
import com.seongcheol.homemonitor.dto.response.LoginResponseDto;
import com.seongcheol.homemonitor.auth.application.service.AuthService;
import com.seongcheol.homemonitor.auth.infrastructure.client.KakaoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

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
        log.debug("유저 로그인 컨트롤러 요청");
        LoginResponseDto loginResponseDto = authService.login(loginRequestDto);
        return ResponseEntity.ok(loginResponseDto);
    }

    @PostMapping("/kakao")
    public ResponseEntity<LoginResponseDto> kakaoLogin(@RequestBody KaKaoAuthorizeRequestDto kaKaoAuthorizeRequestDto) {
        log.debug("카카오 로그인 컨트롤러 요청");
        LoginResponseDto loginResponseDto = kakaoService.login(kaKaoAuthorizeRequestDto);
        return ResponseEntity.ok(loginResponseDto);
    }

}
