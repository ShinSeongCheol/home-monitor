package com.seongcheol.homemonitor.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.Dht11LogDto;
import com.seongcheol.homemonitor.repository.Dht11LogRepository;
import com.seongcheol.homemonitor.service.Dht11LogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SensorController {
	
	private final Dht11LogService dht11LogService;
	
	@GetMapping("/dht11/logs")
	public List<Dht11LogDto> getLogs() throws Exception {
		return dht11LogService.getAllLogs();
	}
	
	@GetMapping("/dht11/log/range")
	public List<Dht11LogDto> getLogsBetween(@RequestParam(value = "start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(value = "end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) throws Exception {
		return dht11LogService.getLogsBetween(start, end);
	}
	
	@GetMapping("/dht11/log/latest")
	public Dht11LogDto getLastLog() throws Exception {
		return dht11LogService.getLatestLog();
	}
	
}
