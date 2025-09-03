package com.seongcheol.homemonitor.service;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.seongcheol.homemonitor.components.JwtUtilComponent;
import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.SocialAccountEntity;
import com.seongcheol.homemonitor.dto.MemberDto;
import com.seongcheol.homemonitor.dto.UserDetailsImpl;
import com.seongcheol.homemonitor.dto.request.KaKaoAuthorizeRequestDto;
import com.seongcheol.homemonitor.dto.response.KakaoTokenResponseDto;
import com.seongcheol.homemonitor.dto.response.KakaoUserInfoResponseDto;
import com.seongcheol.homemonitor.dto.response.LoginResponseDto;
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

    @Autowired
    private JwtUtilComponent jwtUtilComponent;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailServiceImpl userDetailServiceImpl;
    
    public KakaoTokenResponseDto requestToken(KaKaoAuthorizeRequestDto kaKaoAuthorizeRequestDto) {

        logger.debug("카카오 토큰 요청 서비스");

        WebClient webClient = WebClient.builder()
            .baseUrl(KAKAO_OAUTH_URL)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .build();

        KakaoTokenResponseDto kakaoTokenResponseDto = webClient.post()
            .body(
                BodyInserters.fromFormData("grant_type", "authorization_code")
                .with("client_id", KAKAO_CLIENT_ID)
                .with("redirect_uri", KAKAO_REDIRECT_URI)
                .with("code", kaKaoAuthorizeRequestDto.getCode())
            )
            .retrieve()
            .bodyToMono(KakaoTokenResponseDto.class)
            .block()
        ;

        return kakaoTokenResponseDto;
    }

    public KakaoUserInfoResponseDto requestUserInfo(KakaoTokenResponseDto kakaoTokenResponseDto) {

        logger.debug("카카오 유저 정보 요청 서비스");

        WebClient webClient = WebClient.builder()
            .baseUrl(KAKAO_USER_INFO_URL)
            .defaultHeader(HttpHeaders.AUTHORIZATION, kakaoTokenResponseDto.getTokenType() + " " + kakaoTokenResponseDto.getAccessToken())
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .build();
        
        KakaoUserInfoResponseDto kakaoUserInfoResponseDto = webClient.get()
            .retrieve()
            .bodyToMono(KakaoUserInfoResponseDto.class)
            .block();

        return kakaoUserInfoResponseDto;
    }

    @Transactional
    public MemberDto loadOrCreateSocialAccount(KakaoUserInfoResponseDto kakaoUserInfoResponseDto) {

        logger.debug("카카오 소셜 계정 생성 서비스");

        SocialAccountEntity socialAccountEntity = socialAccountRepository.findByProviderAndProviderId("KAKAO", kakaoUserInfoResponseDto.getId())
        .orElseGet(
            () -> {

                MemberEntity memberEntity = memberRepository.findByEmail(kakaoUserInfoResponseDto.getKakaoAccount().getEmail())
                    .orElseGet(
                        () -> {

                            MemberEntity newMemberEntity = MemberEntity.builder()
                                .email(kakaoUserInfoResponseDto.getKakaoAccount().getEmail())
                                .username(kakaoUserInfoResponseDto.getKakaoAccount().getProfile().getNickname())
                                .password(passwordEncoder.encode(KAKAO_CLIENT_ID))
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
                    .providerId(kakaoUserInfoResponseDto.getId())
                    .build()
                ;
                            
                memberEntity.addSocialAccount(newSocialAccountEntity);

                return socialAccountRepository.save(newSocialAccountEntity);
            }  
        );

        return MemberDto.fromEntity(socialAccountEntity.getMember());
    }

    @Transactional
    public LoginResponseDto login(KaKaoAuthorizeRequestDto kaKaoAuthorizRequesteDto) {

        logger.debug("카카오 소셜 로그인 서비스");

        KakaoTokenResponseDto kakaoTokenDto = requestToken(kaKaoAuthorizRequesteDto);
        KakaoUserInfoResponseDto kakaoUserInfoResponseDto = requestUserInfo(kakaoTokenDto);
        MemberDto memberDto = loadOrCreateSocialAccount(kakaoUserInfoResponseDto);

        UserDetailsImpl userDetailsImpl  = (UserDetailsImpl) userDetailServiceImpl.loadUserByUsername(memberDto.getEmail());
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetailsImpl, null, userDetailsImpl.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

        String accessToken = jwtUtilComponent.createAccessToken(memberDto);

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
            .email(memberDto.getEmail())
            .name(memberDto.getNickname())
            .authorities(userDetailsImpl.getAuthorities())
            .accessToken(accessToken)
            .build()
        ;

        return loginResponseDto;
    }

}
