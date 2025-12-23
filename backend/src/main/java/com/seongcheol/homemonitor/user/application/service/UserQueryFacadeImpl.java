package com.seongcheol.homemonitor.user.application.service;

import com.seongcheol.homemonitor.user.api.facade.UserQueryFacade;
import com.seongcheol.homemonitor.user.application.command.GetUserCommand;
import com.seongcheol.homemonitor.user.application.port.out.UserQueryPort;
import com.seongcheol.homemonitor.user.application.port.out.UserRoleCodeQueryPort;
import com.seongcheol.homemonitor.user.application.port.out.UserRoleQueryPort;
import com.seongcheol.homemonitor.user.application.result.GetUserResult;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserQueryFacadeImpl implements UserQueryFacade {

    private final UserQueryPort userQueryPort;
    private final UserRoleQueryPort userRoleQueryPort;
    private final UserRoleCodeQueryPort userRoleCodeQueryPort;

    @Override
    public GetUserResult findByEmail(GetUserCommand getUserCommand) {
        User user =  userQueryPort.findByEmail(getUserCommand.email());
        List<UserRole> userRoles = userRoleQueryPort.findByUser(user);
        List<String> roles = userRoles.stream().map(userRole -> userRoleCodeQueryPort.findById(userRole.getUserRoleCodeId()).getCode()).toList();
        return new GetUserResult(user.getEmail(), user.getUsername(), user.getPassword(), roles);
    }

}
