package com.seongcheol.homemonitor.user.domain.model;

public class User {
    private Long id;
    private String email;
    private String username;
    private String password;
    private Long socialAccountId;

    public User(Long id, String email, String username, String password) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    private User(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public static User create(String email, String username, String encodedPassword) {
        return new User(email, username, encodedPassword);
    }

    public User update(String username, String password) {
        this.username = username;
        this.password = password;
        return this;
    }

    public Long getId() {
        return id;
    }

    public Long getSocialAccountId() {
        return socialAccountId;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
