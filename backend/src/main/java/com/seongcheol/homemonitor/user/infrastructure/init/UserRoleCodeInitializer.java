package com.seongcheol.homemonitor.user.infrastructure.init;

import com.seongcheol.homemonitor.user.domain.service.UserRoleCodeService;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRoleCodeJpaRepository;
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

    private final UserRoleCodeJpaRepository userRoleCodeJpaRepository;
    private final UserRoleCodeService userRoleCodeService;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        boolean isRoleUserExist = userRoleCodeJpaRepository.existsByCode("ROLE_USER");
        boolean isRoleAdminExist = userRoleCodeJpaRepository.existsByCode("ROLE_ADMIN");

        if (!isRoleUserExist) {
            userRoleCodeService.createUserRoleCode("ROLE_USER", "사용자");
        }

        if (!isRoleAdminExist) {
            userRoleCodeService.createUserRoleCode("ROLE_ADMIN", "관리자");
        }
    }

}
