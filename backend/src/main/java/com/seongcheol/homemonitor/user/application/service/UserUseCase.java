package com.seongcheol.homemonitor.user.application.service;

import com.seongcheol.homemonitor.user.application.command.CreateUserCommand;
import com.seongcheol.homemonitor.user.application.port.in.UserPort;
import com.seongcheol.homemonitor.user.domain.port.out.*;
import com.seongcheol.homemonitor.user.application.result.CreateUserResult;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserUseCase implements UserPort {

    private final UserService userService;

    private final UserRepository userRepository;

    @Override
    @Transactional
    public CreateUserResult createUser(CreateUserCommand createUserCommand) {

        boolean isUserExist = userRepository.existsByEmail(createUserCommand.email());

        User user;

        // 사용자 존재
        if (isUserExist) {
            user = userService.addLocalAccountToExistingUser(createUserCommand.email(), createUserCommand.nickname(), createUserCommand.password());
        // 사용자 미존재
        } else {
            user =  userService.createNewUserWithLocalAccount(createUserCommand.email(), createUserCommand.nickname(), createUserCommand.password());
        }

        return new CreateUserResult(user.getEmail(), user.getUsername());

    }

    @Override
    @Transactional
    public CreateUserResult updateUser(CreateUserCommand createUserCommand) {
        User updatedUser = userService.updateUser(createUserCommand.email(), createUserCommand.nickname(), createUserCommand.password());
        return new CreateUserResult(updatedUser.getEmail(), updatedUser.getUsername());
    }

}
