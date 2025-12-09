package com.seongcheol.homemonitor.user.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String email;
    private String username;
    private String password;
    private Set<UserRole> roles = new HashSet<>();
    private Set<SocialAccount> socialAccounts = new HashSet<>();

    public static User create(String email, String username, String encodedPassword) {
        return User.builder()
                .email(email)
                .username(username)
                .password(encodedPassword)
                .build();
    }

    public User update(String username, String password) {
        this.username = username;
        this.password = password;
        return this;
    }
}
