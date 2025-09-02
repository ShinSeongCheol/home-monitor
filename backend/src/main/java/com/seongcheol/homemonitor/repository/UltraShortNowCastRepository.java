package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seongcheol.homemonitor.domain.UltraShortNowCastEntity;

public interface UltraShortNowCastRepository extends JpaRepository<UltraShortNowCastEntity, Long> {

    @Query("""
            SELECT
                usn
            FROM
                UltraShortNowCastEntity usn
            JOIN
                usn.administrativeDistrict ad
            WHERE
                ad.level1 = :level1
                AND ad.level2 = :level2
            ORDER BY usn.id DESC LIMIT 1
            """)
    public UltraShortNowCastEntity findLatestUltraShortNowCastByRegion(@Param("level1") String level1, @Param("level2") String level2);
}
