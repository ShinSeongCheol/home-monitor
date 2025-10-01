package com.seongcheol.homemonitor.dto.backOffice;

import java.time.LocalDateTime;

import com.seongcheol.homemonitor.domain.PostEntity;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeBoardResponseDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeMemberResponseDto;

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
    private BackOfficeMemberResponseDto member;
    private BackOfficeBoardResponseDto board;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int view;

    public static BackOfficePostDto fromEntity(PostEntity postEntity) {
        return BackOfficePostDto.builder()
        .id(postEntity.getId())
        .member(BackOfficeMemberResponseDto.fromEntity(postEntity.getMember()))
        .board(BackOfficeBoardResponseDto.fromEntity(postEntity.getBoard()))
        .title(postEntity.getTitle())
        .content(postEntity.getContent())
        .createdAt(postEntity.getCreatedAt())
        .updatedAt(postEntity.getUpdatedAt())
        .view(postEntity.getView())
        .build();
    }
}
