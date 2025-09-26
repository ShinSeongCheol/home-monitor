package com.seongcheol.homemonitor.dto.backOffice;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeBoardRoleResponseDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficePostResponseDto;

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
public class BackOfficeBoardDto {
    private Long id;
    private String categoryCode;
    private String categoryName;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<BackOfficePostResponseDto> posts;
    private Set<BackOfficeBoardRoleResponseDto> boardRole;

    public static BackOfficeBoardDto fromEntity(BoardEntity boardEntity) {
        return BackOfficeBoardDto.builder()
        .id(boardEntity.getId())
        .categoryCode(boardEntity.getCategoryCode())
        .categoryName(boardEntity.getCategoryName())
        .comment(boardEntity.getComment())
        .createdAt(boardEntity.getCreatedAt())
        .updatedAt(boardEntity.getUpdatedAt())
        .posts(boardEntity.getPosts().stream().map(BackOfficePostResponseDto::fromEntity).collect(Collectors.toSet()))
        .boardRole(boardEntity.getBoardRoles().stream().map(BackOfficeBoardRoleResponseDto::fromEntity).collect(Collectors.toSet()))
        .build();
    }
}
