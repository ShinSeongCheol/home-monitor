package com.seongcheol.homemonitor.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.seongcheol.homemonitor.domain.UltraShortNowCastEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UltraShortNowcastResponseDto {

    private AdministrativeDistrictDto administrativeDistrict;
    private LocalDate baseDate;
    private LocalTime baseTime;
    private Double T1H;
    private Double RN1;
    private Double UUU;
    private Double VVV;
    private Double REH;
    private Byte PTY;
    private Double VEC;
    private Double WSD;

    public static UltraShortNowcastResponseDto fromEntity(UltraShortNowCastEntity ultraShortNowCastEntity) {
        return UltraShortNowcastResponseDto.builder()
            .administrativeDistrict(AdministrativeDistrictDto.fromEntity(ultraShortNowCastEntity.getAdministrativeDistrict()))
            .baseDate(ultraShortNowCastEntity.getBaseDate())
            .baseTime(ultraShortNowCastEntity.getBaseTime())
            .T1H(ultraShortNowCastEntity.getT1H())
            .RN1(ultraShortNowCastEntity.getRN1())
            .UUU(ultraShortNowCastEntity.getUUU())
            .VVV(ultraShortNowCastEntity.getVVV())
            .REH(ultraShortNowCastEntity.getREH())
            .PTY(ultraShortNowCastEntity.getPTY())
            .VEC(ultraShortNowCastEntity.getVEC())
            .WSD(ultraShortNowCastEntity.getWSD())
            .build()
        ;
    }
}