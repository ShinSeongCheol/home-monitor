package com.seongcheol.homemonitor.dto.backOffice;

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
public class BackOfficeMemberRoleCodeDto {
    private Long id;
    private String code;
    private String name;

    public static BackOfficeMemberRoleCodeDto fromEntity(MemberRoleCodeEntity memberRoleCodeEntity) {
        return BackOfficeMemberRoleCodeDto.builder()
        .id(memberRoleCodeEntity.getId())
        .code(memberRoleCodeEntity.getCode())
        .name(memberRoleCodeEntity.getName())
        .build();
    }
}