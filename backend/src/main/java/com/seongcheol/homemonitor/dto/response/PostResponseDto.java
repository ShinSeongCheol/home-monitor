package com.seongcheol.homemonitor.dto.response;

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
public class PostResponseDto {
    private String title;
    private String content;
    private int view;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PostResponseDto fromEntity(PostEntity postEntity) {
        return PostResponseDto.builder()
            .title(postEntity.getTitle())
            .content(postEntity.getContent())
            .view(postEntity.getView())
            .createdAt(postEntity.getCreatedAt())
            .updatedAt(postEntity.getUpdatedAt())
            .build()
        ;
    }
}
