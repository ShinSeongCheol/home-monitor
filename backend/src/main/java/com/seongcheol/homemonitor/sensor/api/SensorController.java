package com.seongcheol.homemonitor.sensor.api;

import com.seongcheol.homemonitor.sensor.api.dto.response.SensorResponseDto;
import com.seongcheol.homemonitor.sensor.application.service.SensorService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class SensorController {

    private final SensorService sensorService;

    @GetMapping("/dht11/logs")
    public ResponseEntity<List<SensorResponseDto>> findAllLog() {
        return ResponseEntity.ok(sensorService.findAllLog());
    }

    @GetMapping("/dht11/log/range")
    public ResponseEntity<List<SensorResponseDto>> findLogsBetween(
            @RequestParam(value = "start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(value = "end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end)
            {

        return ResponseEntity.ok(sensorService.findLogsBetween(start, end));
    }

    @GetMapping("/dht11/log/today")
    public ResponseEntity<List<SensorResponseDto>> findTodayLog() {
        return ResponseEntity.ok(sensorService.findTodayLog());
    }

    @GetMapping("/dht11/log/latest")
    public ResponseEntity<SensorResponseDto> findLatestLog() {
        try {
            return ResponseEntity.ok(sensorService.findLatestLog());
        } catch (NoSuchElementException e) {
            return ResponseEntity.noContent().build();
        }
    }

}
