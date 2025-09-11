package com.seongcheol.homemonitor.dto.response;

import com.seongcheol.homemonitor.domain.CommentEntity;

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
public class CommentResponseDto {
    private Long id;
    private String content;

    public static CommentResponseDto fromEntity(CommentEntity commentEntity) {
        return CommentResponseDto.builder()
            .id(commentEntity.getId())
            .content(commentEntity.getContent())
            .build()
        ;
    }
}
