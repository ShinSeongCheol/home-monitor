package com.seongcheol.homemonitor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, Long>{
    Optional<MemberEntity> findByName(String name);
}
