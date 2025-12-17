package com.seongcheol.homemonitor.user.infrastructure.adapter;

import com.seongcheol.homemonitor.user.application.port.out.UserRoleQueryPort;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRole;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleEntity;
import com.seongcheol.homemonitor.user.infrastructure.mapper.UserRoleMapper;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRoleQueryPortImpl implements UserRoleQueryPort {

    private final UserRoleRepository userRoleJpaRepository;

    @Override
    public UserRole save(User user, UserRoleCode userRoleCode) {
        UserRoleEntity userRoleEntity = userRoleJpaRepository.save(UserRoleMapper.toEntity(user, userRoleCode));
        return UserRoleMapper.toDomain(userRoleEntity);
    }
}
