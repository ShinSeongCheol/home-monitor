package com.seongcheol.homemonitor.dto.backOffice;

import com.seongcheol.homemonitor.domain.MemberRoleEntity;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeMemberResponseDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeMemberRoleCodeResponseDto;

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
public class BackOfficeMemberRoleDto {
    private Long id;
    private BackOfficeMemberResponseDto member;
    private BackOfficeMemberRoleCodeResponseDto memberRoleCode;

    public static BackOfficeMemberRoleDto fromEntity(MemberRoleEntity memberRoleEntity) {
        return BackOfficeMemberRoleDto.builder()
        .id(memberRoleEntity.getId())
        .member(BackOfficeMemberResponseDto.fromEntity(memberRoleEntity.getMember()))
        .memberRoleCode(BackOfficeMemberRoleCodeResponseDto.fromEntity(memberRoleEntity.getMemberRoleCode()))
        .build();
    }
}
