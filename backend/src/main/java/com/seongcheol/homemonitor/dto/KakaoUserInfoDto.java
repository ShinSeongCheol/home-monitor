package com.seongcheol.homemonitor.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class KakaoUserInfoDto {
    @JsonProperty(value = "id")
    private Long id;

    @JsonProperty(value = "connected_at")
    private LocalDateTime connectedAt;

    @JsonProperty(value = "properties")
    private Property property;

    @JsonProperty(value = "kakao_account")
    private KakaoAccount kakaoAccount;

    @Getter
    @ToString
    public static class Property {
        @JsonProperty(value = "nickname")
        private String nickname;

        @JsonProperty(value = "profile_image")
        private String profileImage;

        @JsonProperty(value = "thumbnail_image")
        private String thumbnailImage;
    }

    @Getter
    @ToString
    public static class KakaoAccount {
        @JsonProperty(value = "profile_nickname_needs_agreement")
        private Boolean profileNeedsAgreement;

        @JsonProperty(value = "profile_image_needs_agreement")
        private Boolean profileImageNeedsAgreement;

        @JsonProperty(value = "profile")
        private Profile profile;

        @JsonProperty(value = "has_email")
        private Boolean hasEmail;

        @JsonProperty(value = "email_needs_agreement")
        private Boolean emailNeedsAgreement;

        @JsonProperty(value = "is_email_valid")
        private Boolean isEmailValid;

        @JsonProperty(value = "is_email_verified")
        private Boolean isEmailVerified;

        @JsonProperty(value = "email")
        private String email;
        
        @Getter
        @ToString
        public static class Profile {
            @JsonProperty(value = "nickname")
            private String nickname;

            @JsonProperty(value = "thumbnail_image_url")
            private String thumbnailImageUrl;

            @JsonProperty(value = "profile_image_url")
            private String profileImageUrl;

            @JsonProperty(value = "is_default_image")
            private Boolean isDefaultImage;

            @JsonProperty(value = "is_default_nickname")
            private Boolean isDefaultNickname;

        }
    }
}
