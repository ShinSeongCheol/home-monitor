package com.seongcheol.homemonitor.dto.backOffice.response;

import java.time.LocalDateTime;
import java.util.Optional;
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
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private BackOfficePostResponseDto post;
    private BackOfficeMemberResponseDto member;
    private BackOfficeCommentResponseDto parentComment;
    private Set<BackOfficeReactionResponseDto> reactions;

    public static BackOfficeCommentResponseDto fromEntity(CommentEntity commentEntity) {
        return BackOfficeCommentResponseDto.builder()
        .id(commentEntity.getId())
        .content(commentEntity.getContent())
        .createdAt(commentEntity.getCreatedAt())
        .updatedAt(commentEntity.getUpdatedAt())
        .post(BackOfficePostResponseDto.fromEntity(commentEntity.getPost()))
        .member(BackOfficeMemberResponseDto.fromEntity(commentEntity.getMember()))
        .parentComment(Optional.ofNullable(commentEntity.getParentComment()).map(BackOfficeCommentResponseDto::fromEntity).orElse(null))
        .reactions(commentEntity.getReactions().stream().map(BackOfficeReactionResponseDto::fromEntity).collect(Collectors.toSet()))
        .build();
    }
}
