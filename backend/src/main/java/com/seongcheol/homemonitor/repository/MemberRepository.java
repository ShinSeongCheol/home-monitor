package com.seongcheol.homemonitor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, Long>{
    Optional<MemberEntity> findByEmail(String email);
    boolean existsByEmail(String email);

     Optional<MemberEntity> findByEmailAndSocialAccountsProvider(String email, String provider);

    boolean existsByEmailAndSocialAccountsProvider(String email, String provider);
}
