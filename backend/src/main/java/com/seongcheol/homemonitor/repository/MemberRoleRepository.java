package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.MemberRoleCodeEntity;
import com.seongcheol.homemonitor.domain.MemberRoleEntity;

public interface MemberRoleRepository extends JpaRepository<MemberRoleEntity, Long>{
    boolean existsByMemberAndMemberRoleCode(MemberEntity member, MemberRoleCodeEntity memberRoleCodeEntity);
}