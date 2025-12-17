package com.seongcheol.homemonitor.user.infrastructure.init;

import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleCodeEntity;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRoleCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Order(1)
@Component
@RequiredArgsConstructor
public class UserRoleCodeInitializer implements ApplicationRunner {

    private final UserRoleCodeRepository userRoleCodeRepository;

    //TODO
    // 초기 권한 코드 생성 UseCase 필요

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        boolean isRoleUserExist = userRoleCodeRepository.existsByCode("ROLE_USER");
        boolean isRoleAdminExist = userRoleCodeRepository.existsByCode("ROLE_ADMIN");

        if (!isRoleUserExist) {
            boolean ixExist = userRoleCodeRepository.existsByCode("ROLE_USER");

            if (ixExist) {
                throw new IllegalArgumentException("사용자 권한 코드가 존재합니다.");
            }

            UserRoleCodeEntity userRoleCodeEntity = UserRoleCodeEntity.builder()
                    .code("ROLE_USER")
                    .name("사용자")
                    .build();
            userRoleCodeRepository.save(userRoleCodeEntity);
        }

        if (!isRoleAdminExist) {
            boolean ixExist = userRoleCodeRepository.existsByCode("ROLE_USER");

            if (ixExist) {
                throw new IllegalArgumentException("관리자 권한 코드가 존재합니다.");
            }

            UserRoleCodeEntity userRoleCodeEntity = UserRoleCodeEntity.builder()
                    .code("ROLE_ADMIN")
                    .name("관리자")
                    .build();
            userRoleCodeRepository.save(userRoleCodeEntity);
        }
    }

}
