package com.seongcheol.homemonitor.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.dto.Dht11LogDto;
import com.seongcheol.homemonitor.repository.Dht11LogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Dht11LogService {
	
	private final Dht11LogRepository dht11LogRepository;
	
	// 전체 조회
	public List<Dht11LogDto> getAllLogs() {
		return dht11LogRepository.findAll().stream().map(Dht11LogDto::fromEntity).toList();
	}
	
    // 기간 조회
    public List<Dht11LogDto> getLogsBetween(LocalDateTime start, LocalDateTime end) {
        return dht11LogRepository.findByMeasurementTimeBetween(start, end).stream().map(Dht11LogDto::fromEntity).toList();
    }

    // 오늘 조회
    public List<Dht11LogDto> getTodayLog() {

        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);

        return dht11LogRepository.getTodayLog(startOfDay, endOfDay).stream().map(Dht11LogDto::fromEntity).toList();
    }
    
    // 마지막 로그 조회
    public Dht11LogDto getLatestLog() {
    	return Dht11LogDto.fromEntity(dht11LogRepository.findTopByOrderByMeasurementTimeDesc().orElseThrow());
    }
}
