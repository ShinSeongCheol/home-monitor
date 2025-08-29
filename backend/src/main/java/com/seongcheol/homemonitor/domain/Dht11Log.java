package com.seongcheol.homemonitor.domain;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dht11_log")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Dht11Log {
	@Id
	private LocalDateTime measurementTime;
	
	@Column(length = 8)
	private String temperature;
	@Column(length = 8)
	private String humidity;
}
