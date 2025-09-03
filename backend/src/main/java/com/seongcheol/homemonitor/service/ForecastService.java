package com.seongcheol.homemonitor.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seongcheol.homemonitor.domain.AdministrativeDistrictEntity;
import com.seongcheol.homemonitor.domain.UltraShortNowCastEntity;
import com.seongcheol.homemonitor.dto.AdministrativeDistrictDto;
import com.seongcheol.homemonitor.dto.UltraShortNowcastResponseDto;
import com.seongcheol.homemonitor.dto.UltraSrtNcstResponseDto;
import com.seongcheol.homemonitor.dto.UltraSrtNcstResponseDto.Item;
import com.seongcheol.homemonitor.repository.AdministrativeDistrictRepository;
import com.seongcheol.homemonitor.repository.UltraShortNowCastRepository;

import jakarta.transaction.Transactional;

@Service
public class ForecastService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${public.data.weather}")
    private String serviceKey;
    
    @Autowired
    private AdministrativeDistrictRepository administrativeDistrictRepository;

    @Autowired
    private UltraShortNowCastRepository ultraShortNowCastRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public List<AdministrativeDistrictDto> getAdministrativeDistrict() {

        logger.debug("기상청 행정구역 코드 조회 서비스");

        List<AdministrativeDistrictEntity> administrativeDistrictEntityList = administrativeDistrictRepository.findAll();
        return administrativeDistrictEntityList.stream().map(administrativeDistrictEntity -> AdministrativeDistrictDto.fromEntity(administrativeDistrictEntity)).toList();
    }

    public void postAdministrativeDistrict(List<AdministrativeDistrictDto> administrativeDistrictDtoList) {

        logger.debug("기상청 행정구역 코드 추가 서비스");

        List<AdministrativeDistrictEntity> administrativeDistrictEntityList = administrativeDistrictDtoList.stream().map((administrativeDistrictDto) -> AdministrativeDistrictDto.toEntity(administrativeDistrictDto)).toList();
        administrativeDistrictRepository.saveAll(administrativeDistrictEntityList);
    }

    public List<AdministrativeDistrictDto> getAdministrativeDistrictLevel2() {

        logger.debug("기상청 행정구역 코드 level2 조회 서비스");

        List<AdministrativeDistrictEntity> administrativeDistrictEntityList = administrativeDistrictRepository.getLevel2List();
        return administrativeDistrictEntityList.stream().map(administrativeDistrictEntity -> AdministrativeDistrictDto.fromEntity((administrativeDistrictEntity))).toList();
    }

    // 초단기 실황 조회
    @Transactional
    public void getUltraForecastNowCast() {

        logger.debug("초단기 실황 조회 데이터 요청 서비스");

        List<AdministrativeDistrictEntity> administrativeDistrictEntityList = administrativeDistrictRepository.getLevel2List();

        LocalDate localDate = LocalDate.now();
        LocalTime localTime = LocalTime.now();

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmm");

        String currentDate = localDate.format(dateFormatter);
        String currentTime = localTime.format(timeFormatter);
        
        for (AdministrativeDistrictEntity administrativeDistrictEntity : administrativeDistrictEntityList) {
            try {
                int x = administrativeDistrictEntity.getX();
                int y = administrativeDistrictEntity.getY();
    
                WebClient webClient = WebClient.builder().baseUrl("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0").defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE).build();
                String response = webClient.get()
                    .uri("/getUltraSrtNcst?serviceKey={serviceKey}&dataType={dataType}&base_date={base_date}&base_time={base_time}&nx={nx}&ny={ny}", serviceKey, "JSON", currentDate, currentTime, x, y)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(60))
                    .block();
                ;
    
                logger.info(response.toString());
    
                UltraSrtNcstResponseDto ultraSrtNcstResponseDto;
                try {
                    ultraSrtNcstResponseDto = objectMapper.readValue(response, UltraSrtNcstResponseDto.class);
                } catch (JsonProcessingException e) {
                    logger.error("getUltraForecastNowCast Json Parse Error", e);
                    // throw new RuntimeException(e);
                    continue;
                }
    
                UltraShortNowCastEntity.UltraShortNowCastEntityBuilder builder = UltraShortNowCastEntity.builder()
                    .administrativeDistrict(administrativeDistrictEntity)
                    .baseDate(localDate)
                    .baseTime(localTime);
    
                for (Item item : ultraSrtNcstResponseDto.getResponse().getBody().getItems().getItemList()) {
                    String category = item.getCategory();
                    String value = item.getObsrValue();
    
                    switch(category) {
                        case "T1H" -> builder.T1H(Double.parseDouble(value));
                        case "RN1" -> builder.RN1(Double.parseDouble(value));
                        case "UUU" -> builder.UUU(Double.parseDouble(value));
                        case "VVV" -> builder.VVV(Double.parseDouble(value));
                        case "REH" -> builder.REH(Double.parseDouble(value));
                        case "PTY" -> builder.PTY(Byte.parseByte(value));
                        case "VEC" -> builder.VEC(Double.parseDouble(value));
                        case "WSD" -> builder.WSD(Double.parseDouble(value));
                        default -> logger.warn("Unknown category: {}", category);
                    }
                }
    
                UltraShortNowCastEntity ultraShortNowCastEntity = builder.build();
                ultraShortNowCastRepository.save(ultraShortNowCastEntity);
            }catch(Exception e) {
                logger.error("getUltraForecastNowCast Error", e);
            }
        }
    }

    public UltraShortNowcastResponseDto findLatestUltraShortNowCastByRegion() {

        logger.debug("최신 지역별 초단기 실황 데이터 조회 서비스");

        UltraShortNowcastResponseDto administrativeDistrictDto = UltraShortNowcastResponseDto.fromEntity(ultraShortNowCastRepository.findLatestUltraShortNowCastByRegion("경상북도", "경산시"));
        
        return administrativeDistrictDto;
    }

    public List<UltraShortNowcastResponseDto> findTodayUltraShortNowCastByRegionAndBaseDate() {

        logger.debug("최신 지역별 하루 초단기 실황 데이터 조회 서비스");

        LocalDate baseDate = LocalDate.now();

        List<UltraShortNowcastResponseDto> administrativeDistrictDtoList = ultraShortNowCastRepository.findTodayUltraShortNowCastByRegionAndBaseDate("경상북도", "경산시", baseDate).stream().map(ultraShrotNowCastEntity -> UltraShortNowcastResponseDto.fromEntity(ultraShrotNowCastEntity)).toList();
        
        return administrativeDistrictDtoList;
    }
}
