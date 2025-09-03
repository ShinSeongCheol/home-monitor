package com.seongcheol.homemonitor.dto;

import java.time.LocalDateTime;

import com.seongcheol.homemonitor.domain.Dht11LogEntity;

import lombok.Data;

@Data
public class Dht11LogDto {
	private LocalDateTime measurementTime;
	private String temperature;
	private String humidity;
	
    public static Dht11LogDto fromEntity(Dht11LogEntity entity) {
    	Dht11LogDto dto = new Dht11LogDto();
        dto.measurementTime = entity.getMeasurementTime();
        dto.temperature = entity.getTemperature();
        dto.humidity = entity.getHumidity();
        return dto;
    }

    public Dht11LogEntity toEntity() {
        return new Dht11LogEntity(measurementTime, temperature, humidity);
    }
}
