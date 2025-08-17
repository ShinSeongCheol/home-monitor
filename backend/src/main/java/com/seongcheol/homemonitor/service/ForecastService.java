package com.seongcheol.homemonitor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.AdministrativeDistrictEntity;
import com.seongcheol.homemonitor.dto.AdministrativeDistrictDto;
import com.seongcheol.homemonitor.repository.AdministrativeDistrictRepository;

@Service
public class ForecastService {
    
    @Autowired
    private AdministrativeDistrictRepository administrativeDistrictRepository;

    public List<AdministrativeDistrictDto> getAdministrativeDistrict() {
        List<AdministrativeDistrictEntity> administrativeDistrictEntityList = administrativeDistrictRepository.findAll();
        return administrativeDistrictEntityList.stream().map(administrativeDistrictEntity -> AdministrativeDistrictDto.fromEntity(administrativeDistrictEntity)).toList();
    }

    public void postAdministrativeDistrict(List<AdministrativeDistrictDto> administrativeDistrictDtoList) {
        List<AdministrativeDistrictEntity> administrativeDistrictEntityList = administrativeDistrictDtoList.stream().map((administrativeDistrictDto) -> AdministrativeDistrictDto.toEntity(administrativeDistrictDto)).toList();
        administrativeDistrictRepository.saveAll(administrativeDistrictEntityList);
    }
}
