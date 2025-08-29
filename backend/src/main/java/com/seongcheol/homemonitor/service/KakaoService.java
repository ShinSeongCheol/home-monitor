package com.seongcheol.homemonitor.service;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.SocialAccountEntity;
import com.seongcheol.homemonitor.dto.KaKaoAuthorizeDto;
import com.seongcheol.homemonitor.dto.KakaoTokenDto;
import com.seongcheol.homemonitor.dto.KakaoUserInfoDto;
import com.seongcheol.homemonitor.dto.MemberDto;
import com.seongcheol.homemonitor.dto.SocialAccountDto;
import com.seongcheol.homemonitor.repository.MemberRepository;
import com.seongcheol.homemonitor.repository.SocialAccountRepository;

import jakarta.transaction.Transactional;

@Service
public class KakaoService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final String KAKAO_OAUTH_URL = "https://kauth.kakao.com/oauth/token";
    private final String KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";

    @Value("${kakao.client_id}")
    private String KAKAO_CLIENT_ID;
    
    @Value("${kakao.redirect_uri}")
    private String KAKAO_REDIRECT_URI;

    @Autowired
    private SocialAccountRepository socialAccountRepository;

    @Autowired
    private MemberRepository memberRepository;
    
    
    public KakaoTokenDto requestToken(KaKaoAuthorizeDto kaKaoAuthorizeDto) {
        WebClient webClient = WebClient.builder()
            .baseUrl(KAKAO_OAUTH_URL)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
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

    public KakaoUserInfoDto requestUserInfo(KakaoTokenDto kakaoTokenDto) {
        WebClient webClient = WebClient.builder()
            .baseUrl(KAKAO_USER_INFO_URL)
            .defaultHeader(HttpHeaders.AUTHORIZATION, kakaoTokenDto.getTokenType() + " " + kakaoTokenDto.getAccessToken())
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .build();
        
        KakaoUserInfoDto kakaoUserInfoDto = webClient.get()
            .retrieve()
            .bodyToMono(KakaoUserInfoDto.class)
            .block();

        return kakaoUserInfoDto;
    }

    @Transactional
    public MemberDto loadOrCreateSocialAccount(KaKaoAuthorizeDto kaKaoAuthorizeDto) {
        KakaoTokenDto kakaoTokenDto = requestToken(kaKaoAuthorizeDto);
        KakaoUserInfoDto kakaoUserInfoDto = requestUserInfo(kakaoTokenDto);

        SocialAccountEntity socialAccountEntity = socialAccountRepository.findByProviderAndProviderId("KAKAO", kakaoUserInfoDto.getId())
        .orElseGet(
            () -> {

                MemberEntity memberEntity = memberRepository.findByEmail(kakaoUserInfoDto.getKakaoAccount().getEmail())
                    .orElseGet(
                        () -> {

                            MemberEntity newMemberEntity = MemberEntity.builder()
                                .email(kakaoUserInfoDto.getKakaoAccount().getEmail())
                                .name(kakaoUserInfoDto.getKakaoAccount().getProfile().getNickname())
                                .role(Set.of("ROLE_USER"))
                                .build()
                            ;

                            MemberEntity savedMemberEntity = memberRepository.save(newMemberEntity);

                            return savedMemberEntity;
                        }
                    );
                
                SocialAccountEntity newSocialAccountEntity = SocialAccountEntity.builder()
                    .member(memberEntity)
                    .provider("KAKAO")
                    .providerId(kakaoUserInfoDto.getId())
                    .build()
                ;
                            
                memberEntity.addSocialAccount(newSocialAccountEntity);

                return socialAccountRepository.save(newSocialAccountEntity);
            }  
        );

        return MemberDto.fromEntity(socialAccountEntity.getMember());

    }

}
