package com.seongcheol.homemonitor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.MemberRoleCodeEntity;

public interface MemberRoleCodeRepository extends JpaRepository<MemberRoleCodeEntity, Long> {
    Optional<MemberRoleCodeEntity> findByCode(String code);   
}
