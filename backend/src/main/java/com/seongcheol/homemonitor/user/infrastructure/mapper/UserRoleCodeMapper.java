package com.seongcheol.homemonitor.user.infrastructure.mapper;

import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleCodeEntity;

public class UserRoleCodeMapper {

    public static UserRoleCode toDomain(UserRoleCodeEntity userRoleCodeEntity) {
        return UserRoleCode.builder()
                .id(userRoleCodeEntity.getId())
                .code(userRoleCodeEntity.getCode())
                .name(userRoleCodeEntity.getName())
                .build();
    }

    public static UserRoleCodeEntity toEntity(UserRoleCode userRoleCode) {
        return UserRoleCodeEntity.builder()
                .id(userRoleCode.getId())
                .code(userRoleCode.getCode())
                .name(userRoleCode.getName())
                .build();
    }

}
