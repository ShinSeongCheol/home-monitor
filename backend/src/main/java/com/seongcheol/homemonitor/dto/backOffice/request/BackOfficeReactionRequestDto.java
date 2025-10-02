package com.seongcheol.homemonitor.dto.backOffice.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BackOfficeReactionRequestDto {
    private Long memberId;
    private Long postId;
    private Long commentId;
    private Long reactionCodeId;
}
