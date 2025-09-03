package com.seongcheol.homemonitor.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.AdministrativeDistrictDto;
import com.seongcheol.homemonitor.dto.response.UltraShortNowcastResponseDto;
import com.seongcheol.homemonitor.service.ForecastService;



@RequestMapping("/api/v1/forecast")
@RestController
public class ForecastController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    private ForecastService forecastService;

    @GetMapping("/region/latest")
    public UltraShortNowcastResponseDto getRegionLatest() {
        logger.debug("지역 초단기 실황 데이터 조회 컨트롤러 요청");
        return forecastService.findLatestUltraShortNowCastByRegion();
    }

    @GetMapping("/region/today")
    public List<UltraShortNowcastResponseDto> getRegionToday() {
        logger.debug("지역 초단기 실황 하루 데이터 조회 컨트롤러 요청");

        return forecastService.findTodayUltraShortNowCastByRegionAndBaseDate();
    }
    

    @GetMapping("/administrativeDistrict")
    public List<AdministrativeDistrictDto> getAdministrativeDistrict() {
        logger.debug("기상청 행정 구역 코드 조회 컨트롤러 요청");

        return forecastService.getAdministrativeDistrict();
    }

    @PostMapping("/administrativeDistrict")
    public ResponseEntity<String> postAdministrativeDistrict(@RequestBody List<AdministrativeDistrictDto> administrativeDisctrictDtoList) {
        logger.debug("기상청 행정 구역 코드 추가 컨트롤러 요청");

        forecastService.postAdministrativeDistrict(administrativeDisctrictDtoList);

        return ResponseEntity.ok().build();
    }

}
