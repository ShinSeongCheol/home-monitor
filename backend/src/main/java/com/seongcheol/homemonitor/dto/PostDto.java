package com.seongcheol.homemonitor.dto;

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
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private int view;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private MemberDto member;

    public static PostDto fromEntity(PostEntity postEntity) {
        return PostDto.builder()
            .id(postEntity.getId())
            .title(postEntity.getTitle())
            .content(postEntity.getContent())
            .view(postEntity.getView())
            .createdAt(postEntity.getCreatedAt())
            .updatedAt(postEntity.getUpdatedAt())
            .member(MemberDto.fromEntity(postEntity.getMember()))
            .build()
        ;
    }
}
