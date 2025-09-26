package com.seongcheol.homemonitor.dto.backOffice;

import java.util.Optional;

import com.seongcheol.homemonitor.domain.BoardRoleEntity;
import com.seongcheol.homemonitor.dto.BoardDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeBoardRoleCodeResposeDto;
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
public class BackOfficeBoardRoleDto {
    private Long id;
    private BoardDto board;
    private BackOfficeBoardRoleCodeResposeDto boardRoleCode;
    private BackOfficeMemberRoleCodeResponseDto memberRoleCode;

    public static BackOfficeBoardRoleDto fromEntity(BoardRoleEntity boardRoleEntity) {
        return BackOfficeBoardRoleDto.builder()
        .id(boardRoleEntity.getId())
        .board(BoardDto.fromEntity(boardRoleEntity.getBoard()))
        .boardRoleCode(BackOfficeBoardRoleCodeResposeDto.fromEntity(boardRoleEntity.getBoardRoleCode()))
        .memberRoleCode(Optional.ofNullable(boardRoleEntity.getMemberRoleCode()).map(BackOfficeMemberRoleCodeResponseDto::fromEntity).orElse(null))
        .build();
    }
}   
