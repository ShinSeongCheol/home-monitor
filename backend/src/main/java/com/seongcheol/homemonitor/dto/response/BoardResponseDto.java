package com.seongcheol.homemonitor.dto.response;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.dto.PostDto;

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
    private Set<PostDto> posts;
    private Set<BoardRoleResponseDto> boardRoles;

    public static BoardResponseDto fromEntity(BoardEntity boardEntity) {
        return BoardResponseDto.builder()
            .categoryCode(boardEntity.getCategoryCode())
            .categoryName(boardEntity.getCategoryName())
            .comment(boardEntity.getComment())
            .createdAt(boardEntity.getCreatedAt())
            .updatedAt(boardEntity.getUpdatedAt())
            .posts(boardEntity.getPosts().stream().map(post -> PostDto.fromEntity(post)).collect(Collectors.toSet()))
            .boardRoles(boardEntity.getBoardRoles().stream().map(boardRole -> BoardRoleResponseDto.fromEntity(boardRole)).collect(Collectors.toSet()))
            .build()
        ;
    }
}
