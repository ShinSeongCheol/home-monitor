package com.seongcheol.homemonitor.user.application.port.in;

import com.seongcheol.homemonitor.user.application.command.CreateUserCommand;
import com.seongcheol.homemonitor.user.application.result.CreateUserResult;

public interface UserCommandPort {
    CreateUserResult createUser(CreateUserCommand createUserCommand);
    CreateUserResult updateUser(CreateUserCommand createUserCommand);
}
