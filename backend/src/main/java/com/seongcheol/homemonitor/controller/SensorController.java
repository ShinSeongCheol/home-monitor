package com.seongcheol.homemonitor.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.Dht11LogDto;
import com.seongcheol.homemonitor.service.Dht11LogService;

@RestController
@RequestMapping("/api/v1")
public class SensorController {

	@Autowired
	private Dht11LogService dht11LogService;

	@GetMapping("/dht11/logs")
	public ResponseEntity<List<Dht11LogDto>> getLogs() throws Exception {
		return ResponseEntity.ok(dht11LogService.getAllLogs());
	}

	@GetMapping("/dht11/log/range")
	public ResponseEntity<List<Dht11LogDto>> getLogsBetween(
			@RequestParam(value = "start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
			@RequestParam(value = "end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end)
			throws Exception {
				
		return ResponseEntity.ok(dht11LogService.getLogsBetween(start, end));
	}

	@GetMapping("/dht11/log/latest")
	public ResponseEntity<Dht11LogDto> getLastLog() throws Exception {
		try{
			return ResponseEntity.ok(dht11LogService.getLatestLog());
		}catch(NoSuchElementException e) {
			return ResponseEntity.noContent().build();
		}
	}

}
