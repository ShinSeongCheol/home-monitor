package com.seongcheol.homemonitor.user.domain.port.out;

import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;

public interface UserRoleCodeRepository {

    UserRoleCode findByCode(String code);
    boolean existsByCode(String code);
    UserRoleCode save(String code, String name);
}
