package com.seongcheol.homemonitor.dto.response;

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
public class BoardRoleResponseDto {
    private BoardRoleCodeResponseDto boardRoleCode;
    private MemberRoleCodeResponseDto memberRoleCode;

    public static BoardRoleResponseDto fromEntity(BoardRoleEntity boardRoleEntity) {
        return BoardRoleResponseDto.builder()
            .boardRoleCode(BoardRoleCodeResponseDto.fromEntity(boardRoleEntity.getBoardRoleCode()))
            .memberRoleCode(MemberRoleCodeResponseDto.fromEntity(boardRoleEntity.getMemberRoleCode()))
            .build()
        ;
    }
}
