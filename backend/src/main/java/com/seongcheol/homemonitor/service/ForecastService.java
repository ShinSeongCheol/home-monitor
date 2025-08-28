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
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.seongcheol.homemonitor.domain.AdministrativeDistrictEntity;
import com.seongcheol.homemonitor.domain.UltraShortNowCastEntity;
import com.seongcheol.homemonitor.dto.AdministrativeDistrictDto;
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
    public void getUltraForecastNowCast() throws Exception {
        List<AdministrativeDistrictEntity> administrativeDistrictEntityList = administrativeDistrictRepository.getLevel2List();

        LocalDate localDate = LocalDate.now();
        LocalTime localTime = LocalTime.now();

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmm");

        String currentDate = localDate.format(dateFormatter);
        String currentTime = localTime.format(timeFormatter);
        
        for (AdministrativeDistrictEntity administrativeDistrictEntity : administrativeDistrictEntityList) {
            int x = administrativeDistrictEntity.getX();
            int y = administrativeDistrictEntity.getY();

            WebClient webClient = WebClient.builder().baseUrl("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0").defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE).build();
            UltraSrtNcstResponseDto response = webClient.get()
                .uri("/getUltraSrtNcst?serviceKey={serviceKey}&dataType={dataType}&base_date={base_date}&base_time={base_time}&nx={nx}&ny={ny}", serviceKey, "JSON", currentDate, currentTime, x, y)
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse -> 
                    clientResponse.bodyToMono(String.class).map(body -> {
                        logger.error("API Error response: {}", body);
                        return new RuntimeException("Forecast Scheduler Error" + body);
                    })
                )
                .bodyToMono(UltraSrtNcstResponseDto.class)
                .timeout(Duration.ofSeconds(60))
                .block();
                ;

            logger.info(response.toString());

            UltraShortNowCastEntity.UltraShortNowCastEntityBuilder builder = UltraShortNowCastEntity.builder()
                .administrativeDistrict(administrativeDistrictEntity)
                .baseDate(localDate)
                .baseTime(localTime);

            for (Item item : response.getResponse().getBody().getItems().getItemList()) {
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
        }
    }
}
