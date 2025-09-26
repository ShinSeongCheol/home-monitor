package com.seongcheol.homemonitor.dto.backOffice;

import java.util.Set;
import java.util.stream.Collectors;

import com.seongcheol.homemonitor.domain.BoardRoleCodeEntity;
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
public class BackOfficeBoardRoleCodeDto {
    private Long id;
    private String code;
    private String name;
    private Set<BackOfficeBoardRoleResponseDto> boardRole;

    public static BackOfficeBoardRoleCodeDto fromEntity(BoardRoleCodeEntity boardRoleCodeEntity) {
        return BackOfficeBoardRoleCodeDto.builder()
        .id(boardRoleCodeEntity.getId())
        .code(boardRoleCodeEntity.getCode())
        .name(boardRoleCodeEntity.getName())
        .boardRole(boardRoleCodeEntity.getBoardRole().stream().map(BackOfficeBoardRoleResponseDto::fromEntity).collect(Collectors.toSet()))
        .build();
    }
}
