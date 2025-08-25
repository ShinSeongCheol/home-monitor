package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.UltraShortNowCastEntity;

public interface UltraShortNowCastRepository extends JpaRepository<UltraShortNowCastEntity, Long> {
    
}
