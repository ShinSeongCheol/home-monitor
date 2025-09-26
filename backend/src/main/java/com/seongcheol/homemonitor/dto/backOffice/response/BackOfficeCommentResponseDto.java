package com.seongcheol.homemonitor.dto.backOffice.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
public class BackOfficeCommentResponseDto {
    private Long id;
    private List<BackOfficeCommentResponseDto> comments;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<BackOfficeReactionResponseDto> reactions;

    public static BackOfficeCommentResponseDto fromEntity(CommentEntity commentEntity) {
        return BackOfficeCommentResponseDto.builder()
        .id(commentEntity.getId())
        .comments(commentEntity.getChildrenComment().stream().map(BackOfficeCommentResponseDto::fromEntity).toList())
        .content(commentEntity.getContent())
        .createdAt(commentEntity.getCreatedAt())
        .updatedAt(commentEntity.getUpdatedAt())
        .reactions(commentEntity.getReactions().stream().map(BackOfficeReactionResponseDto::fromEntity).collect(Collectors.toSet()))
        .build();
    }
}
