package com.seongcheol.homemonitor.dto.response;

import java.util.Optional;

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
    private PostResponseDto post;
    private CommentResponseDto comment;
    private ReactionCodeResponseDto reactionCode;

    public static ReactionResponseDto fromEntity(ReactionEntity reactionEntity) {
        return ReactionResponseDto.builder()
            .member(MemberDto.fromEntity(reactionEntity.getMemmber()))
            .post(PostResponseDto.fromEntity(reactionEntity.getPost()))
            .comment(Optional.ofNullable(reactionEntity.getComment()).map((comment) -> CommentResponseDto.fromEntity(comment)).orElse(null))
            .reactionCode(ReactionCodeResponseDto.fromEntity(reactionEntity.getReactionCode()))
            .build()
        ;
    }

}
