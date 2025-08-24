package com.seongcheol.homemonitor.domain;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UltraShortNowCast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "administrative_district_code")
    private AdministrativeDistrictEntity administrativeDistrict;

    private LocalDate baseDate;
    private LocalTime baseTime;
    private Double T1H;
    private Double RN1;
    private Double UUU;
    private Double VVV;
    private Double REH;
    private Double PTY;
    private Double VEC;
    private Double WSD;
}
