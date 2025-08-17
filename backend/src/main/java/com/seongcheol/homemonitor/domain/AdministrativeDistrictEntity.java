package com.seongcheol.homemonitor.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "forecast_administrative_district")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdministrativeDistrictEntity {
    private String type;
    @Id
    private Long code;
    private String level1;
    private String level2;
    private String level3;
    private int x;
    private int y;
    private int longitude_degrees;
    private int longitude_minutes;
    private float longitude_seconds;
    private int latitude_degrees;
    private int latitude_minutes;
    private float latitude_seconds;
    private Double longitude;
    private Double latitude;
    private LocalDate updatedAt;
}
