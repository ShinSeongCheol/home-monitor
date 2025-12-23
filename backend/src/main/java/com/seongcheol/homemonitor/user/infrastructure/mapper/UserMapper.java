package com.seongcheol.homemonitor.user.infrastructure.mapper;

import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserEntity;

import java.util.stream.Collectors;

public class UserMapper {

    public static User toDomain(UserEntity userEntity) {
        return new User(userEntity.getId(), userEntity.getEmail(), userEntity.getUsername(), userEntity.getPassword());
    }

    public static UserEntity toEntity(User user) {
        return UserEntity.builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
    }

}
