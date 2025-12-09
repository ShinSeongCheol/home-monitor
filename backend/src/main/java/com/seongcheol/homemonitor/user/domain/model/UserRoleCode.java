package com.seongcheol.homemonitor.user.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleCode {
    private Long id;
    private String code;
    private String name;
}
