package com.seongcheol.homemonitor.dto.response;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.seongcheol.homemonitor.domain.PostEntity;
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
public class PostResponseDto {
    private String title;
    private String content;
    private int view;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private MemberDto member;
    private BoardResponseDto board;
    private Set<CommentResponseDto> comments;

    public static PostResponseDto fromEntity(PostEntity postEntity) {
        return PostResponseDto.builder()
            .title(postEntity.getTitle())
            .content(postEntity.getContent())
            .view(postEntity.getView())
            .createdAt(postEntity.getCreatedAt())
            .updatedAt(postEntity.getUpdatedAt())
            .member(MemberDto.fromEntity(postEntity.getMember()))
            .board(BoardResponseDto.fromEntity(postEntity.getBoard()))
            .comments(postEntity.getComments().stream().map(comment -> CommentResponseDto.fromEntity(comment)).collect(Collectors.toSet()))
            .build()
        ;
    }
}
