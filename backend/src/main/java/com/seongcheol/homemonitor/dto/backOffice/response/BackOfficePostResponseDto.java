package com.seongcheol.homemonitor.dto.backOffice.response;

import java.time.LocalDateTime;

import com.seongcheol.homemonitor.domain.PostEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BackOfficePostResponseDto {
    private Long id;
    private BackOfficeMemberResponseDto member;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BackOfficePostResponseDto fromEntity(PostEntity postEntity) {
        return BackOfficePostResponseDto.builder()
        .id(postEntity.getId())
        .member(BackOfficeMemberResponseDto.fromEntity(postEntity.getMember()))
        .title(postEntity.getTitle())
        .content(postEntity.getContent())
        .createdAt(postEntity.getCreatedAt())
        .updatedAt(postEntity.getUpdatedAt())
        .build();
    }
}
