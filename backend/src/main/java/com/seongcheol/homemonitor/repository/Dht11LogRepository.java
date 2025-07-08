package com.seongcheol.homemonitor.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.Dht11Log;

public interface Dht11LogRepository extends JpaRepository<Dht11Log, LocalDateTime>{
	List<Dht11Log> findByMeasurementTimeBetween(LocalDateTime start, LocalDateTime end);
	Optional<Dht11Log> findTopByOrderByMeasurementTimeDesc();
}
