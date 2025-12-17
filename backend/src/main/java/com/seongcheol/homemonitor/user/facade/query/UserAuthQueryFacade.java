package com.seongcheol.homemonitor.user.facade.query;

import com.seongcheol.homemonitor.user.facade.query.dto.UserAuthDto;

public interface UserAuthQueryFacade {
    UserAuthDto findForAuthByEmail(String email);
}
