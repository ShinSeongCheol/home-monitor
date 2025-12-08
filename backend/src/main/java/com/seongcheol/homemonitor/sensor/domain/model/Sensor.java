package com.seongcheol.homemonitor.sensor.domain.model;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Sensor {
    private LocalDateTime measurementTime;
    private String temperature;
    private String humidity;
}
