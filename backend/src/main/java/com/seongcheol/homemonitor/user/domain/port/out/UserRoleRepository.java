package com.seongcheol.homemonitor.user.domain.port.out;

import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRole;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;

public interface UserRoleRepository {
    UserRole save(User user, UserRoleCode userRoleCode);
}
