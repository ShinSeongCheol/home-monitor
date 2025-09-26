package com.seongcheol.homemonitor.dto.backOffice;

import java.util.Set;
import java.util.stream.Collectors;

import com.seongcheol.homemonitor.domain.MemberRoleCodeEntity;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeBoardRoleResponseDto;

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
    private Set<BackOfficeBoardRoleResponseDto> boardRoles;

    public static BackOfficeMemberRoleCodeDto fromEntity(MemberRoleCodeEntity memberRoleCodeEntity) {
        return BackOfficeMemberRoleCodeDto.builder()
        .id(memberRoleCodeEntity.getId())
        .code(memberRoleCodeEntity.getCode())
        .name(memberRoleCodeEntity.getName())
        .boardRoles(memberRoleCodeEntity.getBoardRole().stream().map(BackOfficeBoardRoleResponseDto::fromEntity).collect(Collectors.toSet()))
        .build();
    }
}