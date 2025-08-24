package com.seongcheol.homemonitor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.seongcheol.homemonitor.domain.AdministrativeDistrictEntity;

public interface AdministrativeDistrictRepository extends JpaRepository<AdministrativeDistrictEntity, Long> {

    @Query("""
            SELECT 
                fad
            FROM
                AdministrativeDistrictEntity fad
            WHERE
                (fad.level2 <> '' AND fad.level2 IS NOT NULL)
                AND
                (fad.level3 = '' OR fad.level3 IS NULL)
            """)
    List<AdministrativeDistrictEntity> getLevel2List();
    
}
