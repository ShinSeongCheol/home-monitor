package com.seongcheol.homemonitor.dto.response;

import com.seongcheol.homemonitor.domain.ReactionCodeEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ReactionCodeResponseDto {
    private String code;
    private String name;

    public static ReactionCodeResponseDto fromEntity(ReactionCodeEntity reactionCodeEntity) {
        return ReactionCodeResponseDto.builder()
            .code(reactionCodeEntity.getCode())
            .name(reactionCodeEntity.getName())
            .build()
        ;
    }
}
