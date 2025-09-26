package com.seongcheol.homemonitor.dto.backOffice.response;

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
public class BackOfficeBoardRoleCodeResposeDto {
    private Long id;
    private String code;
    private String name;

    public static BackOfficeBoardRoleCodeResposeDto fromEntity(BoardRoleCodeEntity boardRoleCodeEntity) {
        return BackOfficeBoardRoleCodeResposeDto.builder()
        .id(boardRoleCodeEntity.getId())
        .code(boardRoleCodeEntity.getCode())
        .name(boardRoleCodeEntity.getName())
        .build();
    }
}
