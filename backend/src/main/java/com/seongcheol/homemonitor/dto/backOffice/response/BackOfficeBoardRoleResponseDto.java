package com.seongcheol.homemonitor.dto.backOffice.response;

import java.util.Optional;

import com.seongcheol.homemonitor.domain.BoardRoleEntity;

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
public class BackOfficeBoardRoleResponseDto {
    private Long id;
    private BackOfficeBoardResponseDto board;
    private BackOfficeBoardRoleCodeResposeDto boardRoleCode;
    private BackOfficeMemberRoleCodeResponseDto memberRoleCode;

    public static BackOfficeBoardRoleResponseDto fromEntity(BoardRoleEntity boardRoleEntity) {
        return BackOfficeBoardRoleResponseDto.builder()
        .id(boardRoleEntity.getId())
        .board(BackOfficeBoardResponseDto.fromEntity(boardRoleEntity.getBoard()))
        .boardRoleCode(BackOfficeBoardRoleCodeResposeDto.fromEntity(boardRoleEntity.getBoardRoleCode()))
        .memberRoleCode(Optional.ofNullable(boardRoleEntity.getMemberRoleCode()).map(BackOfficeMemberRoleCodeResponseDto::fromEntity).orElse(null))
        .build();
    }
}
