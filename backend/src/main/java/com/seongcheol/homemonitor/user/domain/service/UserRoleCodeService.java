package com.seongcheol.homemonitor.user.domain.service;

import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import com.seongcheol.homemonitor.user.domain.port.out.UserRoleCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class UserRoleCodeService {

    private final UserRoleCodeRepository userRoleCodeRepository;

    @Transactional
    public UserRoleCode createUserRoleCode(String code, String name) {
        boolean ixExist = userRoleCodeRepository.existsByCode(code);
        if (ixExist) {
            throw new IllegalArgumentException("사용자 권한 코드가 존재합니다.");
        }
        return userRoleCodeRepository.save(code, name);
    }

}
