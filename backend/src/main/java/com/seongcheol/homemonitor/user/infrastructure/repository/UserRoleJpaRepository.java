package com.seongcheol.homemonitor.user.infrastructure.repository;

import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleJpaRepository extends JpaRepository<UserRoleEntity,Long> {
}
