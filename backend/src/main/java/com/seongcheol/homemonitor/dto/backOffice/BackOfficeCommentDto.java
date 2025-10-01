package com.seongcheol.homemonitor.dto.backOffice;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.seongcheol.homemonitor.domain.CommentEntity;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeCommentResponseDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeMemberResponseDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficePostResponseDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeReactionResponseDto;

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
public class BackOfficeCommentDto {
    private Long id;
    private BackOfficeMemberResponseDto member;
    private BackOfficePostResponseDto post;
    private BackOfficeCommentResponseDto parentComment;
    private String content;
    private List<BackOfficeCommentDto> comments;
    private List<BackOfficeReactionResponseDto> reactions;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BackOfficeCommentDto fromEntity(CommentEntity commentEntity) {
        return BackOfficeCommentDto.builder()
        .id(commentEntity.getId())
        .member(BackOfficeMemberResponseDto.fromEntity(commentEntity.getMember()))
        .post(BackOfficePostResponseDto.fromEntity(commentEntity.getPost()))
        .content(commentEntity.getContent())
        .parentComment(Optional.ofNullable(commentEntity.getParentComment()).map(BackOfficeCommentResponseDto::fromEntity).orElse(null))
        .comments(commentEntity.getChildrenComment().stream().map(BackOfficeCommentDto::fromEntity).toList())
        .reactions(commentEntity.getReactions().stream().map(BackOfficeReactionResponseDto::fromEntity).toList())
        .createdAt(commentEntity.getCreatedAt())
        .updatedAt(commentEntity.getUpdatedAt())
        .build();
    }
}
