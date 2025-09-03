package com.seongcheol.homemonitor.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seongcheol.homemonitor.domain.Dht11LogEntity;

public interface Dht11LogRepository extends JpaRepository<Dht11LogEntity, LocalDateTime>{
	List<Dht11LogEntity> findByMeasurementTimeBetween(LocalDateTime start, LocalDateTime end);
	Optional<Dht11LogEntity> findTopByOrderByMeasurementTimeDesc();

	@Query("""
			SELECT
				log
			FROM
				Dht11LogEntity log
			WHERE
				:startOfDay <= log.measurementTime AND log.measurementTime < :endOfDay
				AND FUNCTION('HOUR', log.measurementTime) IS NOT NULL
				AND FUNCTION('MINUTE', log.measurementTime) = 0
				AND FUNCTION('SECOND', log.measurementTime) = 0
			""")
	List<Dht11LogEntity> getTodayLog(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
}
