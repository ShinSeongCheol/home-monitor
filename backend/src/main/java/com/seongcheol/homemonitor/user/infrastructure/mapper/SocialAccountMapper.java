package com.seongcheol.homemonitor.user.infrastructure.mapper;

import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.infrastructure.entity.SocialAccountEntity;

public class SocialAccountMapper {

    public static SocialAccount toDomain(SocialAccountEntity socialAccountEntity) {
        return SocialAccount.builder()
                .id(socialAccountEntity.getId())
                .userId(socialAccountEntity.getUser().getId())
                .providerId(socialAccountEntity.getProviderId())
                .provider(socialAccountEntity.getProvider())
                .build();
    }

    public static SocialAccountEntity toEntity(User user, SocialAccount socialAccount) {
        return SocialAccountEntity.builder()
                .user(UserMapper.toEntity(user))
                .provider(socialAccount.getProvider())
                .providerId(socialAccount.getProviderId())
                .build();
    }

}
