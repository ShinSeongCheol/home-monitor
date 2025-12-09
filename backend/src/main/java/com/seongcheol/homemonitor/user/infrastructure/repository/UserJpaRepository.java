package com.seongcheol.homemonitor.user.infrastructure.repository;

import com.seongcheol.homemonitor.user.infrastructure.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<UserEntity, Integer> {
    boolean existsByEmail(String email);
    Optional<UserEntity> findByEmail(String email);
}
