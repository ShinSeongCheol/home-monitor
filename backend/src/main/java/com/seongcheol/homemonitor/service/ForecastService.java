package com.seongcheol.homemonitor.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.seongcheol.homemonitor.domain.AdministrativeDistrictEntity;
import com.seongcheol.homemonitor.dto.AdministrativeDistrictDto;
import com.seongcheol.homemonitor.dto.UltraSrtNcstResponseDto;
import com.seongcheol.homemonitor.dto.UltraSrtNcstResponseDto.Item;
import com.seongcheol.homemonitor.repository.AdministrativeDistrictRepository;

import jakarta.transaction.Transactional;
import reactor.core.publisher.Mono;

@Service
public class ForecastService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${public.data.weather}")
    private String serviceKey;
    
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

    // level2 지점 행정 구역 코드 조회
    public List<AdministrativeDistrictDto> getAdministrativeDistrictLevel2() {
        List<AdministrativeDistrictEntity> administrativeDistrictEntityList = administrativeDistrictRepository.getLevel2List();
        return administrativeDistrictEntityList.stream().map(administrativeDistrictEntity -> AdministrativeDistrictDto.fromEntity((administrativeDistrictEntity))).toList();
    }

    // 초단기 실황 조회
    @Transactional
    public void getUltraForecastNowCast() {
        List<AdministrativeDistrictEntity> administrativeDistrictEntityList = administrativeDistrictRepository.getLevel2List();
        
        for (AdministrativeDistrictEntity administrativeDistrictEntity : administrativeDistrictEntityList) {
        }
        WebClient webClient = WebClient.builder().baseUrl("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0").build();
        Mono<UltraSrtNcstResponseDto> responseMono = webClient.get()
            .uri("/getUltraSrtNcst?serviceKey={serviceKey}&dataType=JSON&base_date={base_date}&base_time={base_time}&nx={nx}&ny={ny}", serviceKey, "20250825", "0050", 91, 90)
            .retrieve()
            .bodyToMono(UltraSrtNcstResponseDto.class)
        ;

        responseMono.subscribe(
            response -> {
                for (Item item : response.getResponse().getBody().getItems().getItemList()) {
                    logger.info(item.toString());
                }
            },
            error -> logger.error(error.toString())
        );
    }
}
