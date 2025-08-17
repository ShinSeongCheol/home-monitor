package com.seongcheol.homemonitor.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.seongcheol.homemonitor.domain.AdministrativeDistrictEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class AdministrativeDistrictDto {
    private String type;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd")
    private LocalDate updatedAt;

    @Builder
    public AdministrativeDistrictDto(String type, Long code, String level1, String level2, String level3, int x, int y, int longitude_degrees, int longitude_minutes, float longitude_seconds, int latitude_degrees, int latitude_minutes, float latitude_seconds, double longitude, double latitude, LocalDate updatedAt) {
        this.type = type;
        this.code = code;
        this.level1 = level1;
        this.level2 = level2;
        this.level3 = level3;
        this.x = x;
        this.y = y;
        this.longitude_degrees = longitude_degrees;
        this.longitude_minutes = longitude_minutes;
        this.longitude_seconds = longitude_seconds;
        this.latitude_degrees = latitude_degrees;
        this.latitude_minutes = latitude_minutes;
        this.latitude_seconds = latitude_seconds;
        this.longitude = longitude;
        this.latitude = latitude;
        this.updatedAt = updatedAt;
    }

    public static AdministrativeDistrictEntity toEntity(AdministrativeDistrictDto administrativeDistrictDto) {
        return AdministrativeDistrictEntity.builder()
            .type(administrativeDistrictDto.getType())
            .code(administrativeDistrictDto.getCode())
            .level1(administrativeDistrictDto.getLevel1())
            .level2(administrativeDistrictDto.getLevel2())
            .level3(administrativeDistrictDto.getLevel3())
            .x(administrativeDistrictDto.getX())
            .y(administrativeDistrictDto.getY())
            .longitude_degrees(administrativeDistrictDto.getLongitude_degrees())
            .longitude_minutes(administrativeDistrictDto.getLongitude_minutes())
            .longitude_seconds(administrativeDistrictDto.getLongitude_seconds())
            .latitude_degrees(administrativeDistrictDto.getLatitude_degrees())
            .latitude_minutes(administrativeDistrictDto.getLatitude_minutes())
            .latitude_seconds(administrativeDistrictDto.getLatitude_seconds())
            .longitude(administrativeDistrictDto.getLongitude())
            .latitude(administrativeDistrictDto.getLatitude())
            .updatedAt(administrativeDistrictDto.getUpdatedAt())
            .build();
    }

    public static AdministrativeDistrictDto fromEntity(AdministrativeDistrictEntity administrativeDistrictEntity) {
        return AdministrativeDistrictDto.builder()
            .type(administrativeDistrictEntity.getType())
            .code(administrativeDistrictEntity.getCode())
            .level1(administrativeDistrictEntity.getLevel1())
            .level2(administrativeDistrictEntity.getLevel2())
            .level3(administrativeDistrictEntity.getLevel3())
            .x(administrativeDistrictEntity.getX())
            .y(administrativeDistrictEntity.getY())
            .longitude_degrees(administrativeDistrictEntity.getLongitude_degrees())
            .longitude_minutes(administrativeDistrictEntity.getLongitude_minutes())
            .longitude_seconds(administrativeDistrictEntity.getLongitude_seconds())
            .latitude_degrees(administrativeDistrictEntity.getLatitude_degrees())
            .latitude_minutes(administrativeDistrictEntity.getLatitude_minutes())
            .latitude_seconds(administrativeDistrictEntity.getLatitude_seconds())
            .longitude(administrativeDistrictEntity.getLongitude())
            .latitude(administrativeDistrictEntity.getLatitude())
            .updatedAt(administrativeDistrictEntity.getUpdatedAt())
            .build();
    }
}
