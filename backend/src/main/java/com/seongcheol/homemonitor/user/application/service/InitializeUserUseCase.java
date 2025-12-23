package com.seongcheol.homemonitor.user.application.service;

import com.seongcheol.homemonitor.user.application.port.in.InitializeAdminUserUseCase;
import com.seongcheol.homemonitor.user.application.port.in.InitializeUserRoleCodeUseCase;
import com.seongcheol.homemonitor.user.application.port.out.*;
import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleCodeEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class InitializeUserUseCase implements InitializeAdminUserUseCase, InitializeUserRoleCodeUseCase {

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
        User user = User.create("admin@admin.com", "admin", passwordEncoderPort.encode("admin"));
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

    @Override
    public void initializeUserRoleCode() {
        boolean isExistRoleUser = userRoleCodeQueryPort.existsByCode("ROLE_USER");
        boolean isExistRoleAdmin = userRoleCodeQueryPort.existsByCode("ROLE_ADMIN");

        if (isExistRoleUser) {
            throw new IllegalArgumentException("사용자 권한 코드가 존재합니다.");
        }

        if (isExistRoleAdmin) {
            throw new IllegalArgumentException("관리자 권한 코드가 존재합니다.");
        }

        // 사용자, 관리자 권한 코드 생성
        userRoleCodeQueryPort.save("ROLE_USER", "사용자");
        userRoleCodeQueryPort.save("ROLE_ADMIN", "관리자");
    }
}
