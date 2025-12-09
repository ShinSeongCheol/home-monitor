package com.seongcheol.homemonitor.user.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialAccount {
    private Long id;
    private Long userId;
    private Long providerId;
    private String provider;

    public static SocialAccount local(Long userId, Long providerId, String provider) {
        return SocialAccount.builder()
                .id(userId)
                .userId(userId)
                .providerId(providerId)
                .provider(provider)
                .build();
    }
}
