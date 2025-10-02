package com.seongcheol.homemonitor.dto.backOffice;

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
public class ReactionCodeDto {
    private Long id;
    private String code;
    private String name;

    public static ReactionCodeDto fromEntity(ReactionCodeEntity reactionCodeEntity) {
        return ReactionCodeDto.builder()
        .id(reactionCodeEntity.getId())
        .code(reactionCodeEntity.getCode())
        .name(reactionCodeEntity.getName())
        .build();
    }
}
