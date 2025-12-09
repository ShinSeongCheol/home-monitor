package com.seongcheol.homemonitor.sensor.application.port.out;

import com.seongcheol.homemonitor.sensor.domain.model.Sensor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SensorRepository {
    List<Sensor> findAll();
    List<Sensor> findByMeasurementTimeBetween(LocalDateTime start, LocalDateTime end);
    Optional<Sensor> findTopByOrderByMeasurementTimeDesc();
    List<Sensor> findTodayLog(LocalDateTime startOfDay, LocalDateTime endOfDay);
}
