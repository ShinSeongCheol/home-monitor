package com.seongcheol.homemonitor.dto.response;

import com.seongcheol.homemonitor.domain.BoardRoleCodeEntity;

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
public class BoardRoleCodeResponseDto {
    private String code;
    private String name;

    public static BoardRoleCodeResponseDto fromEntity(BoardRoleCodeEntity boardRoleCodeEntity) {
        return BoardRoleCodeResponseDto.builder()
            .code(boardRoleCodeEntity.getCode())
            .name(boardRoleCodeEntity.getName())
            .build()
        ;
    }
}
