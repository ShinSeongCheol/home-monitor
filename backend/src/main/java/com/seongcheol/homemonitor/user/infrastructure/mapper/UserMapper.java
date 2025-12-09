package com.seongcheol.homemonitor.user.infrastructure.mapper;

import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserEntity;

import java.util.stream.Collectors;

public class UserMapper {

    public static User toDomain(UserEntity userEntity) {
        return User.builder()
                .id(userEntity.getId())
                .email(userEntity.getEmail())
                .username(userEntity.getEmail())
                .password(userEntity.getPassword())
                .roles(userEntity.getRoles().stream().map(UserRoleMapper::toDomain).collect(Collectors.toSet()))
                .socialAccounts(userEntity.getSocialAccounts().stream().map(SocialAccountMapper::toDomain).collect(Collectors.toSet()))
                .build();
    }

    public static UserEntity toEntity(User user) {
        return UserEntity.builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
    }

}
