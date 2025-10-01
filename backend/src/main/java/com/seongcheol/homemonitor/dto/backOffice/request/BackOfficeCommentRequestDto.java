package com.seongcheol.homemonitor.dto.backOffice.request;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BackOfficeCommentRequestDto {
    private Long id;
    private Long memberId;
    private Long postId;
    private Long parentCommentId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
