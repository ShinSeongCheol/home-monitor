package com.seongcheol.homemonitor.dto;

import com.seongcheol.homemonitor.domain.SocialAccountEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SocialAccountDto {
    private Long id;
    private MemberDto memberDto;
    private String provider;
    private Long providerId;

    @Builder
    public SocialAccountDto(MemberDto memberDto, String provider, Long providerId) {
        this.memberDto = memberDto;
        this.provider = provider;
        this.providerId = providerId;
    }

    public static SocialAccountDto fromEntity(SocialAccountEntity socialAccountEntity) {
        return SocialAccountDto.builder()
            .memberDto(MemberDto.fromEntity(socialAccountEntity.getMember()))
            .provider(socialAccountEntity.getProvider())
            .providerId(socialAccountEntity.getProviderId())
            .build()
        ;
    }
}
