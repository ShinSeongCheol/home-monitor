package com.seongcheol.homemonitor.sensor.infrastructure.entity;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dht11_log")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SensorEntity {
	@Id
	private LocalDateTime measurementTime;
	
	@Column(length = 8)
	private String temperature;
	@Column(length = 8)
	private String humidity;
}
