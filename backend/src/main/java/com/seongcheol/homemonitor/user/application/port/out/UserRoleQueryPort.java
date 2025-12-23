package com.seongcheol.homemonitor.user.application.port.out;

import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRole;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;

import java.util.List;

public interface UserRoleQueryPort {
    UserRole save(User user, UserRoleCode userRoleCode);
    List<UserRole> findByUser(User user);
}
