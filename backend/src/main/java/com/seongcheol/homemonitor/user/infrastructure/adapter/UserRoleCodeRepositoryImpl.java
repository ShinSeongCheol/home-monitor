package com.seongcheol.homemonitor.user.infrastructure.adapter;

import com.seongcheol.homemonitor.user.application.port.out.UserRoleCodeRepository;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import com.seongcheol.homemonitor.user.infrastructure.mapper.UserRoleCodeMapper;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRoleCodeJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRoleCodeRepositoryImpl implements UserRoleCodeRepository {

    private final UserRoleCodeJpaRepository userRoleCodeJpaRepository;

    @Override
    public UserRoleCode findByCode(String code) {
        return userRoleCodeJpaRepository.findByCode(code).map(UserRoleCodeMapper::toDomain).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 권한 코드입니다."));
    }
}
