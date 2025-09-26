package com.seongcheol.homemonitor.dto.backOffice;

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
public class BackOfficePostDto {
    private Long id;
    private BackOfficeMemberDto member;
    private BackOfficeBoardDto board;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BackOfficePostDto fromEntity(PostEntity postEntity) {
        return BackOfficePostDto.builder()
        .id(postEntity.getId())
        .member(BackOfficeMemberDto.fromEntity(postEntity.getMember()))
        .board(BackOfficeBoardDto.fromEntity(postEntity.getBoard()))
        .title(postEntity.getTitle())
        .content(postEntity.getContent())
        .createdAt(postEntity.getCreatedAt())
        .updatedAt(postEntity.getUpdatedAt())
        .build();
    }
}
