package com.seongcheol.homemonitor.dto.backOffice.request;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BackOfficePostRequestDto {
    private Long id;
    private Long memberId;
    private Long boardId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int view;
}
