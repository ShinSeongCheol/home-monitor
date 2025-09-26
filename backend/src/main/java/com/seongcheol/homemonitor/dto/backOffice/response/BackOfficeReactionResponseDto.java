package com.seongcheol.homemonitor.dto.backOffice.response;

import com.seongcheol.homemonitor.domain.ReactionEntity;

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
public class BackOfficeReactionResponseDto {
    private Long id;

    public static BackOfficeReactionResponseDto fromEntity(ReactionEntity reactionEntity) {
        return BackOfficeReactionResponseDto.builder()
        .id(reactionEntity.getId())
        .build();
    }
}
