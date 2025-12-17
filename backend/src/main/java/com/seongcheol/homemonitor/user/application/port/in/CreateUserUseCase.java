package com.seongcheol.homemonitor.user.application.port.in;

import com.seongcheol.homemonitor.user.application.command.CreateUserCommand;
import com.seongcheol.homemonitor.user.application.result.CreateUserResult;

public interface CreateUserUseCase {
    CreateUserResult createUser(CreateUserCommand createUserCommand);
}
