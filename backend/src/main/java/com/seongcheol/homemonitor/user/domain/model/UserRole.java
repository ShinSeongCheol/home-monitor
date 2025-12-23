package com.seongcheol.homemonitor.user.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRole {

    private Long id;
    private Long userId;
    private Long userRoleCodeId;

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getUserRoleCodeId() {
        return userRoleCodeId;
    }
}
