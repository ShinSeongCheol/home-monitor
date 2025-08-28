package com.seongcheol.homemonitor.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.seongcheol.homemonitor.dto.KaKaoAuthorizeDto;
import com.seongcheol.homemonitor.dto.KakaoTokenDto;

@Service
public class KakaoService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final String KAKAO_OAUTH_URL = "https://kauth.kakao.com/oauth/token";
    private final String KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";

    @Value("${kakao.client_id}")
    private String KAKAO_CLIENT_ID;
    
    @Value("${kakao.redirect_uri}")
    private String KAKAO_REDIRECT_URI;
    
    
    public KakaoTokenDto requestToken(KaKaoAuthorizeDto kaKaoAuthorizeDto) {
        WebClient webClient = WebClient.builder()
            .baseUrl(KAKAO_OAUTH_URL)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8")
            .build();

        KakaoTokenDto kakaoTokenDto = webClient.post()
            .body(
                BodyInserters.fromFormData("grant_type", "authorization_code")
                .with("client_id", KAKAO_CLIENT_ID)
                .with("redirect_uri", KAKAO_REDIRECT_URI)
                .with("code", kaKaoAuthorizeDto.getCode())
            )
            .retrieve()
            .bodyToMono(KakaoTokenDto.class)
            .block()
        ;
        return kakaoTokenDto;
    }

    public void requestUserInfo(KakaoTokenDto kakaoTokenDto) {
        WebClient webClient = WebClient.builder()
            .baseUrl(KAKAO_USER_INFO_URL)
            .defaultHeader(HttpHeaders.AUTHORIZATION, kakaoTokenDto.getTokenType() + " " + kakaoTokenDto.getAccessToken())
            .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8")
            .build();
        
        String response = webClient.get()
            .retrieve()
            .bodyToMono(String.class)
            .block();

        logger.info(response);
    }

}
