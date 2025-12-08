package com.seongcheol.homemonitor.sensor.api.dto.response;

import java.time.LocalDateTime;

import com.seongcheol.homemonitor.sensor.domain.model.Sensor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SensorResponseDto {
	private LocalDateTime measurementTime;
	private String temperature;
	private String humidity;
	
    public static SensorResponseDto from(Sensor sensor) {
        return SensorResponseDto.builder()
                .measurementTime(sensor.getMeasurementTime())
                .temperature(sensor.getTemperature())
                .humidity(sensor.getHumidity())
                .build();
    }
}
