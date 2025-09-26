package com.seongcheol.homemonitor.dto.backOffice.response;

import com.seongcheol.homemonitor.domain.BoardRoleEntity;
import com.seongcheol.homemonitor.dto.BoardDto;

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
    private BoardDto board;

    public static BackOfficeBoardRoleResponseDto fromEntity(BoardRoleEntity boardRoleEntity) {
        return BackOfficeBoardRoleResponseDto.builder()
        .id(boardRoleEntity.getId())
        .board(BoardDto.fromEntity(boardRoleEntity.getBoard()))
        .build();
    }
}
