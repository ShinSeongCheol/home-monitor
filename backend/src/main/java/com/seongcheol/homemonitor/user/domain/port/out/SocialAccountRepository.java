package com.seongcheol.homemonitor.user.domain.port.out;

import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;

public interface SocialAccountRepository {
    SocialAccount save(User user, SocialAccount socialAccount);
    boolean existsByProviderIdAndProvider(Long providerId, String provider);
}
