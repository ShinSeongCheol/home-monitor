package com.seongcheol.homemonitor.auth.application.result;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public record LoginKakaoResult(String email, String name, String accessToken, Collection<GrantedAuthority> authorities) {
}
