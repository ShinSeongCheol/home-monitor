package com.seongcheol.homemonitor.user.infrastructure.init;

import com.seongcheol.homemonitor.user.application.port.in.InitializeAdminUserUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Order(2)
@Component
@RequiredArgsConstructor
public class AdminInitializer implements ApplicationRunner {

    private final InitializeAdminUserUseCase initializeAdminUserUseCase;

    @Override
    public void run(ApplicationArguments args) {
        // 관리자 계정 초기화
        initializeAdminUserUseCase.initializeAdminUser();
    }
}
