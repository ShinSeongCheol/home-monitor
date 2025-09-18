package com.seongcheol.homemonitor.dto.response;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
    private List<CommentResponseDto> children_comment;
    private Set<ReactionResponseDto> reactions;

    public static CommentResponseDto fromEntity(CommentEntity commentEntity) {
        return CommentResponseDto.builder()
            .id(commentEntity.getId())
            .content(commentEntity.getContent())
            .createdAt(commentEntity.getCreatedAt())
            .updatedAt(commentEntity.getUpdatedAt())
            .member(MemberDto.fromEntity(commentEntity.getMember()))
            .children_comment(Optional.ofNullable(commentEntity.getChildrenComment()).orElse(Collections.emptyList()).stream().map((children_comment) -> CommentResponseDto.fromEntity(children_comment)).collect(Collectors.toList()))
            .reactions(Optional.ofNullable(commentEntity.getReactions()).orElse(Collections.emptySet()).stream().map((children_comment) -> ReactionResponseDto.fromEntity(children_comment)).collect(Collectors.toSet()))
            .build()
        ;
    }
}
