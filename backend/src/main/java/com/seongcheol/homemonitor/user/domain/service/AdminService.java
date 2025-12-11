package com.seongcheol.homemonitor.user.domain.service;

import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import com.seongcheol.homemonitor.user.domain.port.out.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final UserRoleCodeRepository userRoleCodeRepository;
    private final SocialAccountRepository socialAccountRepository;

    private final PasswordEncoderPort passwordEncoderPort;

    @Transactional
    public void createAdminUser(String email, String username, String password) {

        User user = User.create(email, username, passwordEncoderPort.encode(password));
        User savedUser = userRepository.save(user);

        UserRoleCode roleUserCode = userRoleCodeRepository.findByCode("ROLE_USER");
        UserRoleCode roleAdminCode = userRoleCodeRepository.findByCode("ROLE_ADMIN");

        userRoleRepository.save(savedUser, roleUserCode);
        userRoleRepository.save(savedUser, roleAdminCode);

        SocialAccount socialAccount = SocialAccount.local(savedUser.getId(), savedUser.getId(), "LOCAL");

        socialAccountRepository.save(savedUser, socialAccount);

    }

}
