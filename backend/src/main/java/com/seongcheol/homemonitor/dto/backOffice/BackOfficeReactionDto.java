package com.seongcheol.homemonitor.dto.backOffice;

import java.util.Optional;

import com.seongcheol.homemonitor.domain.ReactionEntity;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeCommentResponseDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeMemberResponseDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficePostResponseDto;
import com.seongcheol.homemonitor.dto.backOffice.response.BackOfficeReactionCodeResponseDto;

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
public class BackOfficeReactionDto {
    private Long id;
    private BackOfficeMemberResponseDto member;
    private BackOfficePostResponseDto post;
    private BackOfficeCommentResponseDto comment;
    private BackOfficeReactionCodeResponseDto reactionCode;

    public static BackOfficeReactionDto fromEntity(ReactionEntity reactionEntity) {
        return BackOfficeReactionDto.builder()
        .id(reactionEntity.getId())
        .member(BackOfficeMemberResponseDto.fromEntity(reactionEntity.getMember()))
        .post(BackOfficePostResponseDto.fromEntity(reactionEntity.getPost()))
        .comment(Optional.ofNullable(reactionEntity.getComment()).map(BackOfficeCommentResponseDto::fromEntity).orElse(null))
        .reactionCode(BackOfficeReactionCodeResponseDto.fromEntity(reactionEntity.getReactionCode()))
        .build();
    }
}
