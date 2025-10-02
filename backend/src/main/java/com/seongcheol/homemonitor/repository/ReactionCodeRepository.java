package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.ReactionCodeEntity;
import java.util.Optional;


public interface ReactionCodeRepository extends JpaRepository<ReactionCodeEntity, Long> {
    
    Optional<ReactionCodeEntity> findByCode(String code);
    boolean existsByCode(String code);
}
