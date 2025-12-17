package com.seongcheol.homemonitor.user.infrastructure.init;

import com.seongcheol.homemonitor.user.infrastructure.adapter.PasswordEncoderPortImpl;
import com.seongcheol.homemonitor.user.infrastructure.entity.SocialAccountEntity;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserEntity;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleCodeEntity;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleEntity;
import com.seongcheol.homemonitor.user.infrastructure.repository.SocialAccountRepository;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRepository;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRoleCodeRepository;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;

@Order(2)
@Component
@RequiredArgsConstructor
public class AdminInitializer implements ApplicationRunner {

    private final PasswordEncoderPortImpl passwordEncoderPortImpl;

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final UserRoleCodeRepository userRoleCodeRepository;

    private final SocialAccountRepository socialAccountRepository;

    //TODO
    // 관리자 생성 UseCase 생성 필요
    // 도메인 규칙을 따르도록 변경 필요

    @Override
    public void run(ApplicationArguments args) throws Exception {
        boolean isAdminExist =  userRepository.existsByEmail("admin@admin.com");
        if (isAdminExist) return;

        UserEntity userEntity = UserEntity.builder()
                .email("admin@admin.com")
                .username("admin")
                .password(passwordEncoderPortImpl.encode("admin"))
                .build();
        userRepository.save(userEntity);

        UserRoleCodeEntity roleUserCodeEntity = userRoleCodeRepository.findByCode("ROLE_USER").orElseThrow(() -> new NoSuchElementException("ROLE_USER 코드가 없습니다."));
        UserRoleCodeEntity roleAdminCodeEntity = userRoleCodeRepository.findByCode("ROLE_ADMIN").orElseThrow(() -> new NoSuchElementException("ROLE_ADMIN 코드가 없습니다."));

        UserRoleEntity userRoleEntity = UserRoleEntity.builder()
                .user(userEntity)
                .userRoleCode(roleUserCodeEntity)
                .build();

        UserRoleEntity userAdminRoleEntity = UserRoleEntity.builder()
                .user(userEntity)
                .userRoleCode(roleAdminCodeEntity)
                .build();

        userRoleRepository.save(userRoleEntity);
        userRoleRepository.save(userAdminRoleEntity);

        SocialAccountEntity socialAccountEntity = SocialAccountEntity.builder()
                .user(userEntity)
                .providerId(userEntity.getId())
                .provider("LOCAL")
                .build();

        socialAccountRepository.save(socialAccountEntity);
    }
}
