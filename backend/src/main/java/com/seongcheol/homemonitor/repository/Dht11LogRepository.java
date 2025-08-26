package com.seongcheol.homemonitor.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seongcheol.homemonitor.domain.Dht11Log;

public interface Dht11LogRepository extends JpaRepository<Dht11Log, LocalDateTime>{
	List<Dht11Log> findByMeasurementTimeBetween(LocalDateTime start, LocalDateTime end);
	Optional<Dht11Log> findTopByOrderByMeasurementTimeDesc();

	@Query("""
			SELECT
				log
			FROM
				Dht11Log log
			WHERE
				:startOfDay <= log.measurementTime AND log.measurementTime < :endOfDay
				AND FUNCTION('HOUR', log.measurementTime) IS NOT NULL
				AND FUNCTION('MINUTE', log.measurementTime) = 0
				AND FUNCTION('SECOND', log.measurementTime) = 0
			""")
	List<Dht11Log> getTodayLog(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
}
