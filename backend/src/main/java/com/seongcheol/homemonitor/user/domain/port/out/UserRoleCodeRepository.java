package com.seongcheol.homemonitor.user.domain.port.out;

import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;

import java.util.List;

public interface UserRoleCodeRepository {

    List<UserRoleCode> findAllById(List<Long> id);

    UserRoleCode findByCode(String code);

    boolean existsByCode(String code);

    UserRoleCode save(String code, String name);
}
