package com.seongcheol.homemonitor.dto.backOffice.response;

import com.seongcheol.homemonitor.domain.MemberRoleCodeEntity;

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
public class BackOfficeMemberRoleCodeResponseDto {
    private Long id;
    private String code;
    private String name;

    public static BackOfficeMemberRoleCodeResponseDto fromEntity(MemberRoleCodeEntity memberRoleCodeEntity) {
        return BackOfficeMemberRoleCodeResponseDto.builder()
        .id(memberRoleCodeEntity.getId())
        .code(memberRoleCodeEntity.getCode())
        .name(memberRoleCodeEntity.getName())
        .build();
    }
}
