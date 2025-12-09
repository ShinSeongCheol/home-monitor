package com.seongcheol.homemonitor.user.application.command;

public record CreateUserCommand(String email, String nickname, String password) {}
