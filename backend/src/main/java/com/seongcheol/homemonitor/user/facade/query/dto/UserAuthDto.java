package com.seongcheol.homemonitor.user.facade.query.dto;

import java.util.List;

public record UserAuthDto(String email, String username, String password, List<String> roles) {
}
