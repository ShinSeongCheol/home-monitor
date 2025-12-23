package com.seongcheol.homemonitor.user.application.result;

import java.util.List;

public record GetUserResult(String email, String username, String password, List<String> roles) {
}
