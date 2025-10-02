package com.seongcheol.homemonitor.dto.backOffice.response;

import com.seongcheol.homemonitor.domain.ReactionCodeEntity;

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
public class BackOfficeReactionCodeResponseDto {
    private Long id;
    private String code;
    private String name;

    public static BackOfficeReactionCodeResponseDto fromEntity(ReactionCodeEntity reactionCodeEntity) {
        return BackOfficeReactionCodeResponseDto.builder()
        .id(reactionCodeEntity.getId())
        .code(reactionCodeEntity.getCode())
        .name(reactionCodeEntity.getName())
        .build();
    }
}
