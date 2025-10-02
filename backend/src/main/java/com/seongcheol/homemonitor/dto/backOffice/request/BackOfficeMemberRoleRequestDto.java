package com.seongcheol.homemonitor.dto.backOffice.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BackOfficeMemberRoleRequestDto {
    private Long memberId;
    private Long memberRoleCodeId;
}
