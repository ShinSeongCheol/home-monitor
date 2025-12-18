package com.seongcheol.homemonitor.user.application.service;

import com.seongcheol.homemonitor.user.application.port.out.*;
import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class InitializeUserUseCase implements com.seongcheol.homemonitor.user.application.port.in.InitializeAdminUserUseCase {

    private final UserQueryPort userQueryPort;
    private final UserRoleQueryPort userRoleQueryPort;
    private final UserRoleCodeQueryPort userRoleCodeQueryPort;
    private final SocialAccountQueryPort socialAccountQueryPort;

    private final PasswordEncoderPort passwordEncoderPort;

    @Override
    @Transactional
    public void initializeAdminUser() {
        boolean isAdminExist =  userQueryPort.existsByEmail("admin@admin.com");
        if (isAdminExist) return;

        // 사용자 생성
        User user = User.builder()
                .email("admin@admin.com")
                .username("admin")
                .password(passwordEncoderPort.encode("admin"))
                .build();

        User savedUser = userQueryPort.save(user);

        // 사용자 권한 코드 조회
        UserRoleCode roleUserCode = userRoleCodeQueryPort.findByCode("ROLE_USER").orElseThrow(() -> new NoSuchElementException("ROLE_USER 코드가 없습니다."));
        // 관리자 권한 코드 조회
        UserRoleCode roleAdminCode = userRoleCodeQueryPort.findByCode("ROLE_ADMIN").orElseThrow(() -> new NoSuchElementException("ROLE_ADMIN 코드가 없습니다."));

        // 사용자 권한 생성
        userRoleQueryPort.save(savedUser, roleUserCode);
        // 관리자 권한 생성
        userRoleQueryPort.save(savedUser, roleAdminCode);

        // 소셜 계정 생성
        SocialAccount socialAccount = SocialAccount.builder()
                .userId(savedUser.getId())
                .providerId(savedUser.getId())
                .provider("LOCAL")
                .build();

        socialAccountQueryPort.save(savedUser, socialAccount);
    }
}
