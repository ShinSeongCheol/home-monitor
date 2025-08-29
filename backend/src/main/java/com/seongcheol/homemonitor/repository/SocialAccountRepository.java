package com.seongcheol.homemonitor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.SocialAccountEntity;

public interface SocialAccountRepository extends JpaRepository<SocialAccountEntity, Long> {
    Optional<SocialAccountEntity> findByProviderAndProviderId(String provider, Long providerId);
    boolean existsByProviderAndProviderId(String provider, Long providerId);
}
