package com.seongcheol.homemonitor.user.api.dto.request;

import MemberEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
    private String email;
    private String nickname;
    private String password;

    public static UserRequestDto fromEntity(MemberEntity memberEntity) {
        UserRequestDto memberDto = UserRequestDto.builder()
            .email(memberEntity.getEmail())
            .nickname(memberEntity.getUsername())
            .build();
        return memberDto;
    }
}
