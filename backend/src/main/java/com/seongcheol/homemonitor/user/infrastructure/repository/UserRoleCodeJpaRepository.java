package com.seongcheol.homemonitor.user.infrastructure.repository;

import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleCodeJpaRepository extends JpaRepository<UserRoleCodeEntity, Long> {
    Optional<UserRoleCodeEntity> findByCode(String code);
}
