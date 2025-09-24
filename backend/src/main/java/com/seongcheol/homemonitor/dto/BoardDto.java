package com.seongcheol.homemonitor.dto;

import java.time.LocalDateTime;

import com.seongcheol.homemonitor.domain.BoardEntity;

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
public class BoardDto {
    private Long id;
    private String categoryCode;
    private String categoryName;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BoardDto fromEntity(BoardEntity boardEntity) {
        return BoardDto.builder()
        .id(boardEntity.getId())
        .categoryCode(boardEntity.getCategoryCode())
        .categoryName(boardEntity.getCategoryName())
        .comment(boardEntity.getComment())
        .createdAt(boardEntity.getCreatedAt())
        .updatedAt(boardEntity.getUpdatedAt())
        .build();
    }
}
