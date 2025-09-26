package com.seongcheol.homemonitor.dto.backOffice.response;

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
public class BackOfficeMemberResponseDto {
    private Long id;
    private String email;
    private String username;
    private String password;

    public static BackOfficeMemberResponseDto fromEntity(MemberEntity memberEntity) {
        return BackOfficeMemberResponseDto.builder()
        .id(memberEntity.getId())
        .email(memberEntity.getEmail())
        .username(memberEntity.getUsername())
        .password(memberEntity.getPassword())
        .build();
    }
}
