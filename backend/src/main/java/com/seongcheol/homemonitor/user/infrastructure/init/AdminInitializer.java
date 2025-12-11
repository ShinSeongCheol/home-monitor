package com.seongcheol.homemonitor.user.infrastructure.init;

import com.seongcheol.homemonitor.user.domain.service.AdminService;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Order(2)
@Component
@RequiredArgsConstructor
public class AdminInitializer implements ApplicationRunner {

    private final UserJpaRepository userJpaRepository;
    private final AdminService adminService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        boolean isAdminExist =  userJpaRepository.existsByEmail("admin@admin.com");
        if (isAdminExist) return;

        adminService.createAdminUser("admin@admin.com", "admin", "admin");
    }
}
