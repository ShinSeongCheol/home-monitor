package com.seongcheol.homemonitor.dto.response;

import com.seongcheol.homemonitor.domain.ReactionEntity;
import com.seongcheol.homemonitor.dto.MemberDto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ReactionResponseDto {
    
    private MemberDto member;
    private ReactionCodeResponseDto reactionCode;

    public static ReactionResponseDto fromEntity(ReactionEntity reactionEntity) {
        return ReactionResponseDto.builder()
            .member(MemberDto.fromEntity(reactionEntity.getMember()))
            .reactionCode(ReactionCodeResponseDto.fromEntity(reactionEntity.getReactionCode()))
            .build()
        ;
    }

}
