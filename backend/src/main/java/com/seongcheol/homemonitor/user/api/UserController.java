package com.seongcheol.homemonitor.user.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.user.api.dto.request.UserRequestDto;
import com.seongcheol.homemonitor.dto.request.MemberRequestDto;
import com.seongcheol.homemonitor.user.application.service.UserService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserRequestDto> signUp(@RequestBody UserRequestDto userRequestDto) {
        log.debug("유저 회원가입 컨트롤러 요청");

        UserRequestDto memberDto = userService.createUser(userRequestDto);
        return ResponseEntity.ok(memberDto);
    }

    @PutMapping("/{username}")
    public ResponseEntity<UserRequestDto> putMember(@PathVariable("username") String username, @RequestBody MemberRequestDto memberRequestDto) {
        log.debug("유저 정보 수정 컨트롤러 요청");

        UserRequestDto memberDto = userService.updateUser(memberRequestDto);

        return ResponseEntity.ok(memberDto);
    }

}
