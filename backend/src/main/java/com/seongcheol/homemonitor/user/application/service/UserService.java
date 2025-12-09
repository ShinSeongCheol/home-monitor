package com.seongcheol.homemonitor.user.application.service;

import java.util.NoSuchElementException;

import com.seongcheol.homemonitor.user.application.command.CreateUserCommand;
import com.seongcheol.homemonitor.user.application.port.in.UserPort;
import com.seongcheol.homemonitor.user.application.port.out.SocialAccountRepository;
import com.seongcheol.homemonitor.user.application.port.out.UserRepository;
import com.seongcheol.homemonitor.user.application.port.out.UserRoleCodeRepository;
import com.seongcheol.homemonitor.user.application.port.out.UserRoleRepository;
import com.seongcheol.homemonitor.user.application.result.CreateUserResult;
import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleCodeEntity;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleEntity;
import com.seongcheol.homemonitor.user.infrastructure.entity.SocialAccountEntity;
import com.seongcheol.homemonitor.user.api.dto.request.UserRequestDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserPort {

    private UserRepository userRepository;
    private UserRoleRepository userRoleRepository;
    private UserRoleCodeRepository userRoleCodeRepository;
    private SocialAccountRepository socialAccountRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void initAdmin() throws NoSuchElementException{
        UserRoleCodeEntity memberRoleCodeAdminEntity = userRoleCodeRepository.findByCode("ROLE_ADMIN").orElseThrow(() -> new NoSuchElementException("관리자 권한이 없습니다."));
        UserRoleCodeEntity memberRoleCodeUserEntity = userRoleCodeRepository.findByCode("ROLE_USER").orElseThrow(() -> new NoSuchElementException("유저 권한이 없습니다."));

        if(userRepository.existsByEmailAndSocialAccountsProvider("admin@admin.com", "LOCAL")) {
            log.info("ADMIN 계정이 존재합니다.");
            return;
        };

        MemberEntity memberEntity = MemberEntity.builder()
            .email("admin@admin.com")
            .username("admin")
            .password(passwordEncoder.encode("admin"))
            .build()
        ;

        MemberEntity savedMemberEntity = memberRepository.save(memberEntity);

        UserRoleEntity memberRoleUserEntity = UserRoleEntity.builder()
            .member(savedMemberEntity)
            .memberRoleCode(memberRoleCodeUserEntity)
            .build()
        ;

         UserRoleEntity memberRoleAdminEntity = UserRoleEntity.builder()
            .member(savedMemberEntity)
            .memberRoleCode(memberRoleCodeAdminEntity)
            .build()
        ;

        memberRoleRepository.save(memberRoleUserEntity);
        memberRoleRepository.save(memberRoleAdminEntity);

        SocialAccountEntity socialAccountEntity = SocialAccountEntity.builder()
            .member(savedMemberEntity)
            .provider("LOCAL")
            .providerId(savedMemberEntity.getId())
            .build()
        ;

        socialAccountRepository.save(socialAccountEntity);
    }

    @Transactional
    public void initMemberRoleCode() {
        log.info("{} : {}", this.getClass().getSimpleName(), "Member Role Code 초기화 서비스");

        memberRoleCodeRepository.findByCode("ROLE_USER").orElseGet(() -> {
            UserRoleCodeEntity memberRoleCodeEntity = UserRoleCodeEntity.builder().code("ROLE_USER").name("유저").build();
            return memberRoleCodeRepository.save(memberRoleCodeEntity);
        });

        memberRoleCodeRepository.findByCode("ROLE_ADMIN").orElseGet(() -> {
            UserRoleCodeEntity memberRoleCodeEntity = UserRoleCodeEntity.builder().code("ROLE_ADMIN").name("관리자").build();
            return memberRoleCodeRepository.save(memberRoleCodeEntity);
        });
    }

    @Override
    @Transactional
    public CreateUserResult createUser(CreateUserCommand createUserCommand) {

        // 멤버 엔티티에 이메일이 존재
        if (userRepository.existsByEmail(createUserCommand.email())) {
            // 소셜 계정 엔티티에 Provider가 local이 있는지 확인 후 없으면 생성
            User user = userRepository.findByEmail(createUserCommand.email());

            // Local 계정 있으면 에러 처리
            if (socialAccountRepository.existsByProviderIdAndProvider(user.getId(), "LOCAL")) {
                throw new IllegalArgumentException("해당 이메일은 로컬 계정이 있습니다.");
            }

            // 소셜 계정 생성
            SocialAccount socialAccount = SocialAccount.local(user.getId(), user.getId(), "LOCAL");
            socialAccountRepository.save(user, socialAccount);

            // 사용자 업데이트
            User updatedUser = user.update(createUserCommand.nickname(), passwordEncoder.encode(createUserCommand.password()));
            userRepository.save(updatedUser);

            return new CreateUserResult(updatedUser.getEmail(), updatedUser.getUsername());

        } else {
            // 소셜 계정 미 존재
            // 사용자 생성
            User user = User.create(createUserCommand.email(), createUserCommand.nickname(), passwordEncoder.encode(createUserCommand.password()));
            User savedUser = userRepository.save(user);

            // 사용자 권한 부여
            UserRoleCode userRoleCode = userRoleCodeRepository.findByCode("ROLE_USER");
            userRoleRepository.save(savedUser, userRoleCode);

            // 소셜 계정 생성
            SocialAccount socialAccount = SocialAccount.local(savedUser.getId(), savedUser.getId(), "LOCAL");
            socialAccountRepository.save(savedUser, socialAccount);

            return new CreateUserResult(savedUser.getEmail(), savedUser.getUsername());
        }
    }

    @Override
    @Transactional
    public CreateUserResult updateUser(CreateUserCommand createUserCommand) {
        // 유저와 비밀번호 확인
        User user = userRepository.findByEmail(createUserCommand.email());

        if (!passwordEncoder.matches(createUserCommand.password(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        User updateUser = user.update(createUserCommand.nickname(), passwordEncoder.encode(createUserCommand.password()));
        userRepository.save(updateUser);

        return new CreateUserResult(updateUser.getEmail(), updateUser.getUsername());
    }

}
