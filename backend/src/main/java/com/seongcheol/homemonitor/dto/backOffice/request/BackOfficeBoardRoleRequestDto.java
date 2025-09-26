package com.seongcheol.homemonitor.dto.backOffice.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BackOfficeBoardRoleRequestDto {
    private Long boardId;
    private Long boardRoleCodeId;
    private Long memberRoleCodeId;
}
