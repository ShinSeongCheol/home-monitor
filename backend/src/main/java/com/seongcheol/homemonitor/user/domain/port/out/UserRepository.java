package com.seongcheol.homemonitor.user.domain.port.out;

import com.seongcheol.homemonitor.user.domain.model.User;

public interface UserRepository {
    User save(User user);
    boolean existsByEmail(String email);
    User findByEmail(String email);
}
