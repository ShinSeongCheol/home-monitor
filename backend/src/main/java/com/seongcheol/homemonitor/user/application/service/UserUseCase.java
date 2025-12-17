package com.seongcheol.homemonitor.user.application.service;

import com.seongcheol.homemonitor.user.application.command.CreateUserCommand;
import com.seongcheol.homemonitor.user.application.port.in.CreateUserUseCase;
import com.seongcheol.homemonitor.user.application.port.in.UpdateUserUseCase;
import com.seongcheol.homemonitor.user.application.port.out.*;
import com.seongcheol.homemonitor.user.application.result.CreateUserResult;
import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserUseCase implements CreateUserUseCase, UpdateUserUseCase {

    private final PasswordEncoderPort passwordEncoderPort;

    private final UserQueryPort userQueryPort;
    private final UserRoleQueryPort userRoleQueryPort;
    private final UserRoleCodeQueryPort userRoleCodeQueryPort;

    private final SocialAccountQueryPort socialAccountQueryPort;

    @Override
    @Transactional
    public CreateUserResult createUser(CreateUserCommand createUserCommand) {

        boolean isUserExist = userQueryPort.existsByEmail(createUserCommand.email());

        User user;

        // 사용자 존재
        if (isUserExist) {
            // 사용자 조회
            user = userQueryPort.findByEmail(createUserCommand.email());

            // 사용자가 Local 계정 있으면 에러
            if (socialAccountQueryPort.existsByProviderIdAndProvider(user.getId(), "LOCAL")) {
                throw new IllegalArgumentException("해당 이메일은 로컬 계정이 있습니다.");
            }

            // LOCAL 소셜 계정 생성
            SocialAccount socialAccount = SocialAccount.local(user.getId(), user.getId(), "LOCAL");
            socialAccountQueryPort.save(user, socialAccount);

            // 사용자 업데이트
            User updatedUser = user.update(createUserCommand.nickname(), passwordEncoderPort.encode(createUserCommand.password()));
            userQueryPort.save(updatedUser);
        // 사용자 미존재
        } else {
            // 사용자 생성
            user = User.create(createUserCommand.email(), createUserCommand.nickname(), passwordEncoderPort.encode(createUserCommand.nickname()));
            User savedUser = userQueryPort.save(user);

            // 사용자 권한 부여
            UserRoleCode userRoleCode = userRoleCodeQueryPort.findByCode("ROLE_USER");
            userRoleQueryPort.save(savedUser, userRoleCode);

            // 소셜 계정 생성
            SocialAccount socialAccount = SocialAccount.local(savedUser.getId(), savedUser.getId(), "LOCAL");
            socialAccountQueryPort.save(savedUser, socialAccount);
        }

        return new CreateUserResult(user.getEmail(), user.getUsername());

    }

    @Override
    @Transactional
    public CreateUserResult updateUser(CreateUserCommand createUserCommand) {
        User user = userQueryPort.findByEmail(createUserCommand.email());

        if (!passwordEncoderPort.matches(createUserCommand.password(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        User updatedUser = user.update(createUserCommand.nickname(), passwordEncoderPort.encode(createUserCommand.password()));
        userQueryPort.save(updatedUser);
        return new CreateUserResult(updatedUser.getEmail(), updatedUser.getUsername());
    }

}
