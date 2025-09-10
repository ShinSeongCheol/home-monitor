package com.seongcheol.homemonitor.dto.response;

import com.seongcheol.homemonitor.domain.MemberRoleCodeEntity;

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
public class MemberRoleCodeResponseDto {
    private String code;
    private String name;

    public static MemberRoleCodeResponseDto fromEntity(MemberRoleCodeEntity memberRoleCodeEntity) {
        if (memberRoleCodeEntity == null) return null;

        return MemberRoleCodeResponseDto.builder()
            .code(memberRoleCodeEntity.getCode())
            .name(memberRoleCodeEntity.getName())
            .build()
        ;
    }
}
