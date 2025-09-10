package com.seongcheol.homemonitor.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.MemberRoleCodeEntity;
import com.seongcheol.homemonitor.domain.MemberRoleEntity;
import com.seongcheol.homemonitor.domain.SocialAccountEntity;
import com.seongcheol.homemonitor.dto.MemberDto;
import com.seongcheol.homemonitor.dto.request.MemberRequestDto;
import com.seongcheol.homemonitor.repository.MemberRepository;
import com.seongcheol.homemonitor.repository.MemberRoleCodeRepository;
import com.seongcheol.homemonitor.repository.MemberRoleRepository;
import com.seongcheol.homemonitor.repository.SocialAccountRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberRoleRepository memberRoleRepository;
    @Autowired
    private MemberRoleCodeRepository memberRoleCodeRepository;

    @Autowired
    private SocialAccountRepository socialAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void initAdmin() throws NoSuchElementException{
        MemberRoleCodeEntity memberRoleCodeAdminEntity = memberRoleCodeRepository.findByCode("ROLE_ADMIN").orElseThrow(() -> new NoSuchElementException("관리자 권한이 없습니다."));
        MemberRoleCodeEntity memberRoleCodeUserEntity = memberRoleCodeRepository.findByCode("ROLE_USER").orElseThrow(() -> new NoSuchElementException("유저 권한이 없습니다."));

        if(memberRepository.existsByEmailAndSocialAccountsProvider("admin@admin.com", "LOCAL")) {
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

        MemberRoleEntity memberRoleUserEntity = MemberRoleEntity.builder()
            .member(savedMemberEntity)
            .memberRoleCode(memberRoleCodeUserEntity)
            .build()
        ;

         MemberRoleEntity memberRoleAdminEntity = MemberRoleEntity.builder()
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
            MemberRoleCodeEntity memberRoleCodeEntity = MemberRoleCodeEntity.builder().code("ROLE_USER").name("유저").build();
            return memberRoleCodeRepository.save(memberRoleCodeEntity);
        });

        memberRoleCodeRepository.findByCode("ROLE_ADMIN").orElseGet(() -> {
            MemberRoleCodeEntity memberRoleCodeEntity = MemberRoleCodeEntity.builder().code("ROLE_ADMIN").name("관리자").build();
            return memberRoleCodeRepository.save(memberRoleCodeEntity);
        });
    }

    @Transactional
    public MemberDto signup(MemberRequestDto memberRequestDto) throws NoSuchElementException, IllegalArgumentException {

        // 멤버 엔티티에 이메일이 존재
        if (memberRepository.existsByEmail(memberRequestDto.getEmail())) {
            // 소셜 계정 엔티티에 Provider가 local이 있는지 확인 후 없으면 생성
            MemberEntity memberEntity = memberRepository.findByEmail(memberRequestDto.getEmail()).orElseThrow(() -> new NoSuchElementException("해당 이메일의 사용자가 없습니다."));

            // Local 계정 있으면 에러 처리
            if (socialAccountRepository.existsByProviderAndProviderId("LOCAL", memberEntity.getId())) {
                throw new IllegalArgumentException("해당 이메일은 로컬 계정이 있습니다.");
            }

            socialAccountRepository.findByProviderAndProviderId("LOCAL", memberEntity.getId())
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

            MemberRoleCodeEntity memberRoleCodeUserEntity = memberRoleCodeRepository.findByCode("ROLE_USER").orElseThrow(() -> new NoSuchElementException("유저 권한이 없습니다."));
            MemberRoleEntity memberRoleEntity = MemberRoleEntity.builder()
                .member(savedMemberEntity)
                .memberRoleCode(memberRoleCodeUserEntity)
                .build()
            ;

            memberRoleRepository.save(memberRoleEntity);

            SocialAccountEntity socialAccountEntity = SocialAccountEntity.builder()
                .member(savedMemberEntity)
                .provider("LOCAL")
                .providerId(savedMemberEntity.getId())
                .build()
            ;

            socialAccountRepository.save(socialAccountEntity);

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
