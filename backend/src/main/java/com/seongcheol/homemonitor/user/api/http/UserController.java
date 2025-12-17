package com.seongcheol.homemonitor.user.api.http;

import com.seongcheol.homemonitor.user.api.http.dto.response.UserResponseDto;
import com.seongcheol.homemonitor.user.application.command.CreateUserCommand;
import com.seongcheol.homemonitor.user.application.result.CreateUserResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.user.api.http.dto.request.UserRequestDto;
import com.seongcheol.homemonitor.user.application.service.UserUseCase;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserUseCase userUseCase;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signUp(@RequestBody UserRequestDto userRequestDto) {
        log.debug("유저 회원가입 컨트롤러 요청");


        CreateUserCommand createUserCommand = new CreateUserCommand(userRequestDto.getEmail(), userRequestDto.getNickname(), userRequestDto.getPassword());
        CreateUserResult createUserResult = userUseCase.createUser(createUserCommand);

        UserResponseDto userResponseDto = UserResponseDto.builder()
                .email(createUserResult.email())
                .nickname(createUserResult.nickname())
                .build();

        return ResponseEntity.ok(userResponseDto);
    }

    @PutMapping("/{username}")
    public ResponseEntity<UserResponseDto> putMember(@PathVariable("username") String username, @RequestBody UserRequestDto userRequestDto) {
        log.debug("유저 정보 수정 컨트롤러 요청");

        CreateUserCommand createUserCommand = new CreateUserCommand(
                userRequestDto.getEmail(),
                userRequestDto.getNickname(),
                userRequestDto.getPassword()
        );

        CreateUserResult createUserResult = userUseCase.updateUser(createUserCommand);

        UserResponseDto userResponseDto = UserResponseDto.builder()
                .email(createUserResult.email())
                .nickname(createUserResult.nickname())
                .build();

        return ResponseEntity.ok(userResponseDto);
    }

}
