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
import com.seongcheol.homemonitor.service.ForecastService;


@RequestMapping("/api/v1")
@RestController
public class ForecastController {
    
    @Autowired
    private ForecastService forecastService;

    @GetMapping("/forecast/administrativeDistrict")
    public List<AdministrativeDistrictDto> getAdministrativeDistrict() {
        return forecastService.getAdministrativeDistrict();
    }

    @PostMapping("/forecast/administrativeDistrict")
    public ResponseEntity<String> postAdministrativeDistrict(@RequestBody List<AdministrativeDistrictDto> administrativeDisctrictDtoList) {
        forecastService.postAdministrativeDistrict(administrativeDisctrictDtoList);

        return ResponseEntity.ok().build();
    }

}
