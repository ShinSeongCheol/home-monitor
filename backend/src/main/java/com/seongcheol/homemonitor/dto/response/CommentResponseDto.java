package com.seongcheol.homemonitor.dto.response;

import java.time.LocalDateTime;

import com.seongcheol.homemonitor.domain.CommentEntity;
import com.seongcheol.homemonitor.dto.MemberDto;

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
    private MemberDto member;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static CommentResponseDto fromEntity(CommentEntity commentEntity) {
        return CommentResponseDto.builder()
            .id(commentEntity.getId())
            .content(commentEntity.getContent())
            .createdAt(commentEntity.getCreatedAt())
            .updatedAt(commentEntity.getUpdatedAt())
            .member(MemberDto.fromEntity(commentEntity.getMember()))
            .build()
        ;
    }
}
