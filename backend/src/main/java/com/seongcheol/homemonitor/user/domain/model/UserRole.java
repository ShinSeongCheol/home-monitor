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

    public static UserRole assign(Long userId, Long userRoleCodeId) {
        return UserRole.builder()
                .userId(userId)
                .userRoleCodeId(userRoleCodeId)
                .build();
    }

}
