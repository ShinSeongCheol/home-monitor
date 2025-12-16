package com.seongcheol.homemonitor.user.domain.service;

import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import com.seongcheol.homemonitor.user.domain.port.out.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoderPort passwordEncoderPort;

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final UserRoleCodeRepository userRoleCodeRepository;

    private final SocialAccountRepository socialAccountRepository;

    /**
     *
     * @param email    이메일
     * @param username 사용자 이름
     * @param password 비밀번호
     * @return User
     */
    public User createNewUserWithLocalAccount(String email, String username, String password) {
        // 사용자 생성
        User user = User.create(email, username, passwordEncoderPort.encode(password));
        User savedUser = userRepository.save(user);

        // 사용자 권한 부여
        UserRoleCode userRoleCode = userRoleCodeRepository.findByCode("ROLE_USER");
        userRoleRepository.save(savedUser, userRoleCode);

        // 소셜 계정 생성
        SocialAccount socialAccount = SocialAccount.local(savedUser.getId(), savedUser.getId(), "LOCAL");
        socialAccountRepository.save(savedUser, socialAccount);
        return savedUser;
    }

    /**
     *
     * @param email 이메일
     * @param username 사용자 이름
     * @param password 비밀번호
     * @return User
     */
    public User addLocalAccountToExistingUser(String email, String username, String password) {
        // 사용자 조회
        User user = userRepository.findByEmail(email);

        // 사용자가 Local 계정 있으면 에러
        if (socialAccountRepository.existsByProviderIdAndProvider(user.getId(), "LOCAL")) {
            throw new IllegalArgumentException("해당 이메일은 로컬 계정이 있습니다.");
        }

        // LOCAL 소셜 계정 생성
        SocialAccount socialAccount = SocialAccount.local(user.getId(), user.getId(), "LOCAL");
        socialAccountRepository.save(user, socialAccount);

        // 사용자 업데이트
        User updatedUser = user.update(username, passwordEncoderPort.encode(password));
       return  userRepository.save(updatedUser);
    }

    public User updateUser(String email, String username, String password) {
        User user = userRepository.findByEmail(email);

        if (!passwordEncoderPort.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        User updateUser = user.update(username, passwordEncoderPort.encode(password));
        return userRepository.save(updateUser);
    }

    /**
     * 유저 정보 조회
     * @param email 사용자 email
     * @return User
     */
    public User readUser(String email) {
        return userRepository.findByEmail(email);
    }
}
