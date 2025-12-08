package com.seongcheol.homemonitor.sensor.application.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.seongcheol.homemonitor.sensor.domain.port.out.SensorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.sensor.api.dto.response.SensorResponseDto;

@Service
@RequiredArgsConstructor
public class SensorService {
	
    private final SensorRepository sensorRepository;

	// 전체 조회
	public List<SensorResponseDto> findAllLog() {
		return sensorRepository.findAll().stream().map(SensorResponseDto::from).toList();
	}
	
    // 기간 조회
    public List<SensorResponseDto> findLogsBetween(LocalDateTime start, LocalDateTime end) {
        return sensorRepository.findByMeasurementTimeBetween(start, end).stream().map(SensorResponseDto::from).toList();
    }

    // 오늘 조회
    public List<SensorResponseDto> findTodayLog() {

        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);

        return sensorRepository.findTodayLog(startOfDay, endOfDay).stream().map(SensorResponseDto::from).toList();
    }
    
    // 마지막 로그 조회
    public SensorResponseDto findLatestLog() {
    	return sensorRepository.findTopByOrderByMeasurementTimeDesc().map(SensorResponseDto::from).orElseThrow();
    }
}
