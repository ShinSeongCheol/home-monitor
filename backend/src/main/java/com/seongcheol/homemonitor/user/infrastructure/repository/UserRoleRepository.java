package com.seongcheol.homemonitor.user.infrastructure.repository;

import com.seongcheol.homemonitor.user.infrastructure.entity.UserEntity;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRoleEntity,Long> {
    List<UserRoleEntity> findByUser(UserEntity user);
}
