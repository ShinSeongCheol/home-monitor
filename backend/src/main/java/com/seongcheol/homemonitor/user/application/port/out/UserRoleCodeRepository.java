package com.seongcheol.homemonitor.user.application.port.out;

import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;

public interface UserRoleCodeRepository {

    UserRoleCode findByCode(String code);

}
