package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.AdministrativeDistrictEntity;

public interface AdministrativeDistrictRepository extends JpaRepository<AdministrativeDistrictEntity, Long> {
    
}
