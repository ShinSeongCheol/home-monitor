package com.seongcheol.homemonitor.auth.application.port.in;

import com.seongcheol.homemonitor.auth.application.command.GetAuthCommand;
import com.seongcheol.homemonitor.auth.application.command.LoginKakaoCommand;
import com.seongcheol.homemonitor.auth.application.command.LoginLocalCommand;
import com.seongcheol.homemonitor.auth.application.result.GetAuthResult;
import com.seongcheol.homemonitor.auth.application.result.LoginKakaoResult;
import com.seongcheol.homemonitor.auth.application.result.LoginLocalResult;

public interface AuthPort {

    GetAuthResult getAuth(GetAuthCommand getAuthCommand);
    LoginLocalResult loginLocal(LoginLocalCommand loginLocalCommand);
    LoginKakaoResult loginKakao(LoginKakaoCommand loginKakaoCommand);
}
