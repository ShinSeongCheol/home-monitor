package com.seongcheol.homemonitor.user.api.dto.response;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    String email;
    String nickname;
}
