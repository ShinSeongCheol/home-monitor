package com.seongcheol.homemonitor.user.api.facade;

import com.seongcheol.homemonitor.user.application.command.GetUserCommand;
import com.seongcheol.homemonitor.user.application.result.GetUserResult;

public interface UserQueryFacade {
    GetUserResult findByEmail(GetUserCommand getUserCommand);
}
