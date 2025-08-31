package com.seongcheol.homemonitor.dto;

import com.seongcheol.homemonitor.domain.MemberEntity;

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
public class MemberDto {
    private String email;
    private String nickname;

    public static MemberDto fromEntity(MemberEntity memberEntity) {
        MemberDto memberDto = MemberDto.builder()
            .email(memberEntity.getEmail())
            .nickname(memberEntity.getUsername())
            .build();
        return memberDto;
    }
}
