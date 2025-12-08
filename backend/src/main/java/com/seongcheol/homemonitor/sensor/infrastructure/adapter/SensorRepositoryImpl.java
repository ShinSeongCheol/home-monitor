package com.seongcheol.homemonitor.sensor.infrastructure.adapter;

import com.seongcheol.homemonitor.sensor.domain.model.Sensor;
import com.seongcheol.homemonitor.sensor.domain.port.out.SensorRepository;
import com.seongcheol.homemonitor.sensor.infrastructure.mapper.SensorMapper;
import com.seongcheol.homemonitor.sensor.infrastructure.repository.SensorJpaRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class SensorRepositoryImpl implements SensorRepository {

    private final SensorJpaRepository sensorRepository;

    public SensorRepositoryImpl(SensorJpaRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    @Override
    public List<Sensor> findAll() {
        return sensorRepository.findAll().stream().map(SensorMapper::toDomain).toList();
    }

    @Override
    public List<Sensor> findByMeasurementTimeBetween(LocalDateTime start, LocalDateTime end) {
        return sensorRepository.findByMeasurementTimeBetween(start, end).stream().map(SensorMapper::toDomain).toList();
    }

    @Override
    public Optional<Sensor> findTopByOrderByMeasurementTimeDesc() {
        return sensorRepository.findTopByOrderByMeasurementTimeDesc().map(SensorMapper::toDomain);
    }

    @Override
    public List<Sensor> findTodayLog(LocalDateTime startOfDay, LocalDateTime endOfDay) {
        return sensorRepository.findTodayLog(startOfDay, endOfDay).stream().map(SensorMapper::toDomain).toList();
    }
}
