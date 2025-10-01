package com.seongcheol.homemonitor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.BoardRoleCodeEntity;

public interface BoardRoleCodeRepository extends JpaRepository<BoardRoleCodeEntity, Long> {
    Optional<BoardRoleCodeEntity> findByCode(String code);
    boolean existsByCode(String code);
}
