package com.seongcheol.homemonitor.user.application.port.out;

import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;

import java.util.List;
import java.util.Optional;

public interface UserRoleCodeQueryPort {

    List<UserRoleCode> findAllById(List<Long> id);

    Optional<UserRoleCode> findByCode(String code);

    boolean existsByCode(String code);

    UserRoleCode save(String code, String name);
}
