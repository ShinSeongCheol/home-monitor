package com.seongcheol.homemonitor.sensor.infrastructure.mapper;

import com.seongcheol.homemonitor.sensor.domain.model.Sensor;
import com.seongcheol.homemonitor.sensor.infrastructure.entity.SensorEntity;

public class SensorMapper {

    public static  Sensor toDomain(SensorEntity sensorEntity){
        return Sensor.builder()
                .measurementTime(sensorEntity.getMeasurementTime())
                .temperature(sensorEntity.getTemperature())
                .humidity(sensorEntity.getHumidity())
                .build();
    }

}
