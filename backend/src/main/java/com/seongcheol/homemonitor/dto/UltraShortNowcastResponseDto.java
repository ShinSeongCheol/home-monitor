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
    private Double t1h;
    private Double rn1;
    private Double uuu;
    private Double vvv;
    private Double reh;
    private Byte pty;
    private Double vec;
    private Double wsd;

    public static UltraShortNowcastResponseDto fromEntity(UltraShortNowCastEntity ultraShortNowCastEntity) {
        return UltraShortNowcastResponseDto.builder()
            .administrativeDistrict(AdministrativeDistrictDto.fromEntity(ultraShortNowCastEntity.getAdministrativeDistrict()))
            .baseDate(ultraShortNowCastEntity.getBaseDate())
            .baseTime(ultraShortNowCastEntity.getBaseTime())
            .t1h(ultraShortNowCastEntity.getT1H())
            .rn1(ultraShortNowCastEntity.getRN1())
            .uuu(ultraShortNowCastEntity.getUUU())
            .vvv(ultraShortNowCastEntity.getVVV())
            .reh(ultraShortNowCastEntity.getREH())
            .pty(ultraShortNowCastEntity.getPTY())
            .vec(ultraShortNowCastEntity.getVEC())
            .wsd(ultraShortNowCastEntity.getWSD())
            .build()
        ;
    }
}