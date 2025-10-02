package com.seongcheol.homemonitor.dto.backOffice.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BackOfficeMemberRequestDto {
    private String email;
    private String username;
    private String password;
}
