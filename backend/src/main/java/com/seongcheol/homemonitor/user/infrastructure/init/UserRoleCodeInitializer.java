package com.seongcheol.homemonitor.user.infrastructure.init;

import com.seongcheol.homemonitor.user.application.port.in.InitializeUserRoleCodeUseCase;
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
    
    private final InitializeUserRoleCodeUseCase initializeUserRoleCodeUseCase;


    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        initializeUserRoleCodeUseCase.initializeUserRoleCode();
    }

}
