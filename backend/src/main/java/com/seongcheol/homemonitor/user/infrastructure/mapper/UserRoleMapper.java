package com.seongcheol.homemonitor.user.infrastructure.mapper;

import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRole;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleEntity;

public class UserRoleMapper {

    public static UserRole toDomain(UserRoleEntity userRoleEntity) {
        return UserRole.builder()
                .id(userRoleEntity.getId())
                .userId(userRoleEntity.getUser().getId())
                .userRoleCodeId(userRoleEntity.getUserRoleCode().getId())
                .build();
    }

    public static UserRoleEntity toEntity(User user, UserRoleCode userRoleCode) {
        return UserRoleEntity.builder()
                .user(UserMapper.toEntity(user))
                .userRoleCode(UserRoleCodeMapper.toEntity(userRoleCode))
                .build();
    }
}
