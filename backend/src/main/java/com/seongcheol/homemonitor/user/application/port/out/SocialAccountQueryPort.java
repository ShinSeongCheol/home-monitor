package com.seongcheol.homemonitor.user.application.port.out;

import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;

public interface SocialAccountQueryPort {
    SocialAccount save(User user, SocialAccount socialAccount);
    boolean existsByProviderIdAndProvider(Long providerId, String provider);
}
