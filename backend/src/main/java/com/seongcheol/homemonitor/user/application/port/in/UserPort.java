package com.seongcheol.homemonitor.user.application.port.in;

import com.seongcheol.homemonitor.user.application.command.CreateUserCommand;
import com.seongcheol.homemonitor.user.application.command.ReadUserCommand;
import com.seongcheol.homemonitor.user.application.result.CreateUserResult;
import com.seongcheol.homemonitor.user.application.result.ReadUserResult;

public interface UserPort {
    CreateUserResult createUser(CreateUserCommand createUserCommand);
    CreateUserResult updateUser(CreateUserCommand createUserCommand);
    ReadUserResult readUser(ReadUserCommand readUserCommand);
}
