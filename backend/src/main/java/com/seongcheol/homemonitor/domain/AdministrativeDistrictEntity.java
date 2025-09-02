package com.seongcheol.homemonitor.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "forecast_administrative_district")
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AdministrativeDistrictEntity {
    private String type;
    @Id
    private Long code;
    @Column(length = 16)
    private String level1;
    @Column(length = 16)
    private String level2;
    @Column(length = 16)
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
