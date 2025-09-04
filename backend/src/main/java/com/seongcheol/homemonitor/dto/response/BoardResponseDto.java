package com.seongcheol.homemonitor.dto.response;

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
public class BoardResponseDto {
    private String categoryCode;
    private String categoryName;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BoardResponseDto fromEntity(BoardEntity boardEntity) {
        return BoardResponseDto.builder()
            .categoryCode(boardEntity.getCategoryCode())
            .categoryName(boardEntity.getCategoryName())
            .comment(boardEntity.getComment())
            .createdAt(boardEntity.getCreatedAt())
            .updatedAt(boardEntity.getUpdatedAt())
            .build()
        ;
    }
}
