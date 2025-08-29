package com.seongcheol.homemonitor.dto;

import com.seongcheol.homemonitor.domain.MemberEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberDto {
    private String email;
    private String name;
    private String password;
    private String newPassword;

    @Builder
    public MemberDto(String name) {
        this.name = name;
    }

    public static MemberDto fromEntity(MemberEntity memberEntity) {
        MemberDto memberDto = MemberDto.builder()
            .name(memberEntity.getName())
            .build();

        return memberDto;
    }
}
