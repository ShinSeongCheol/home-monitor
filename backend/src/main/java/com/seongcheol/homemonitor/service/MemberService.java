package com.seongcheol.homemonitor.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.MemberRoleEntity;
import com.seongcheol.homemonitor.domain.SocialAccountEntity;
import com.seongcheol.homemonitor.dto.MemberDto;
import com.seongcheol.homemonitor.dto.request.MemberRequestDto;
import com.seongcheol.homemonitor.repository.MemberRepository;
import com.seongcheol.homemonitor.repository.SocialAccountRepository;

@Service
public class MemberService {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private SocialAccountRepository socialAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void initAdmin() {
        if(memberRepository.existsByEmailAndSocialAccountsProvider("admin@admin.com", "LOCAL")) {
            logger.info("ADMIN 계정이 존재합니다.");
            return;
        };

        MemberEntity memberEntity = MemberEntity.builder()
            .email("admin@admin.com")
            .username("admin")
            .password(passwordEncoder.encode("admin"))
            .build()
        ;

        MemberEntity savedMemberEntity = memberRepository.save(memberEntity);

        MemberRoleEntity memberRoleUserEntity = MemberRoleEntity.builder()
            .member(savedMemberEntity)
            .role("ROLE_USER")
            .build()
        ;

         MemberRoleEntity memberRoleAdminEntity = MemberRoleEntity.builder()
            .member(savedMemberEntity)
            .role("ROLE_ADMIN")
            .build()
        ;

        savedMemberEntity.addMemberRole(memberRoleUserEntity);
        savedMemberEntity.addMemberRole(memberRoleAdminEntity);

        SocialAccountEntity socialAccountEntity = SocialAccountEntity.builder()
            .member(savedMemberEntity)
            .provider("LOCAL")
            .providerId(savedMemberEntity.getId())
            .build()
        ;

        savedMemberEntity.addSocialAccount(socialAccountEntity);
    }

    @Transactional
    public MemberDto signup(MemberRequestDto memberRequestDto) {

        // 멤버 엔티티에 이메일이 존재
        if (memberRepository.existsByEmail(memberRequestDto.getEmail())) {
            // 소셜 계정 엔티티에 Provider가 local이 있는지 확인 후 없으면 생성
            MemberEntity memberEntity = memberRepository.findByEmail(memberRequestDto.getEmail()).orElseThrow();

            // Local 계정 있으면 에러 처리
            if (socialAccountRepository.existsByProviderAndProviderId("LOCAL", memberEntity.getId())) {
                throw new IllegalArgumentException("Invalid Email");
            }

            SocialAccountEntity socialAccountEntity = socialAccountRepository.findByProviderAndProviderId("LOCAL", memberEntity.getId())
                .orElseGet(
                    () -> {
                        SocialAccountEntity newSocialAccountEntity = SocialAccountEntity.builder()
                            .member(memberEntity)
                            .provider("LOCAL")
                            .providerId(memberEntity.getId())
                            .build()
                        ;
                        
                        return socialAccountRepository.save(newSocialAccountEntity);
                    }
                    );
            
            memberEntity.setUsername(memberRequestDto.getNickname());
            memberEntity.setPassword(passwordEncoder.encode(memberRequestDto.getPassword()));
            memberEntity.addSocialAccount(socialAccountEntity);

            return MemberDto.fromEntity(memberRepository.save(memberEntity));

        // 없으면 계정 생성
        }else {
            MemberEntity memberEntity = MemberEntity.builder()
                .email(memberRequestDto.getEmail())
                .username(memberRequestDto.getNickname())
                .password(passwordEncoder.encode(memberRequestDto.getPassword()))
                .build()
            ;

            MemberEntity savedMemberEntity = memberRepository.save(memberEntity);

            MemberRoleEntity memberRoleEntity = MemberRoleEntity.builder()
                .member(savedMemberEntity)
                .role("ROLE_USER")
                .build()
            ;

            savedMemberEntity.addMemberRole(memberRoleEntity);

            SocialAccountEntity socialAccountEntity = SocialAccountEntity.builder()
                .member(savedMemberEntity)
                .provider("LOCAL")
                .providerId(savedMemberEntity.getId())
                .build()
            ;

            savedMemberEntity.addSocialAccount(socialAccountEntity);

            return MemberDto.fromEntity(socialAccountEntity.getMember());
        }

    }

    @Transactional
    public MemberDto putMember(MemberRequestDto memberRequestDto) {
        // 유저와 비밀번호 확인
        MemberEntity memberEntity = memberRepository.findByEmailAndSocialAccountsProvider(memberRequestDto.getEmail(), "LOCAL").orElseThrow();

        if (!passwordEncoder.matches(memberRequestDto.getPassword(), memberEntity.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        memberEntity.setUsername(memberRequestDto.getNickname());
        memberEntity.setPassword(passwordEncoder.encode(memberRequestDto.getNewPassword()));

        return MemberDto.fromEntity(memberEntity);
    }

}
