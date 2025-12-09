package com.seongcheol.homemonitor.user.infrastructure.repository;

import com.seongcheol.homemonitor.user.infrastructure.entity.SocialAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocialAccountJpaRepository extends JpaRepository<SocialAccountEntity, Long> {
    boolean existsByProviderIdAndProvider(Long providerId, String provider);
}
