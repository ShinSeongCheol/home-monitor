package com.seongcheol.homemonitor.sensor.infrastructure.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seongcheol.homemonitor.sensor.infrastructure.entity.SensorEntity;

public interface SensorJpaRepository extends JpaRepository<SensorEntity, LocalDateTime>{
	List<SensorEntity> findByMeasurementTimeBetween(LocalDateTime start, LocalDateTime end);
	Optional<SensorEntity> findTopByOrderByMeasurementTimeDesc();

	@Query("""
			SELECT
				log
			FROM
				SensorEntity log
			WHERE
				:startOfDay <= log.measurementTime AND log.measurementTime < :endOfDay
				AND FUNCTION('HOUR', log.measurementTime) IS NOT NULL
				AND FUNCTION('MINUTE', log.measurementTime) = 0
				AND FUNCTION('SECOND', log.measurementTime) = 0
			""")
	List<SensorEntity> findTodayLog(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
}
