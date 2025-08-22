package com.seongcheol.homemonitor.service;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.dto.MemberDto;
import com.seongcheol.homemonitor.repository.MemberRepository;

@Service
public class MemberService {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void initAdmin() {
        if(memberRepository.existsByName("admin")) {
            throw new IllegalArgumentException("Admin 계정이 이미 존재합니다.");
        };

        Set<String> role = new HashSet<>();
        role.add("ROLE_USER");
        role.add("ROLE_ADMIN");

        MemberEntity memberEntity = MemberEntity.builder()
        .name("admin")
        .password(passwordEncoder.encode("admin"))
        .role(role)
        .build();

        memberRepository.save(memberEntity);
    }

    @Transactional
    public MemberDto signup(MemberDto memberDto) {
        if (memberRepository.existsByName(memberDto.getName())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");

        MemberEntity memberEntity = MemberEntity.builder()
            .name(memberDto.getName())
            .password(passwordEncoder.encode(memberDto.getPassword()))
            .role(roles)
            .build();

        MemberEntity savedMemberEntity = memberRepository.save(memberEntity);

        return MemberDto.fromEntity(savedMemberEntity);
    }

    @Transactional
    public MemberDto putMember(MemberDto memberDto) {
        // 유저와 비밀번호 확인
        MemberEntity memberEntity = memberRepository.findByName(memberDto.getName()).orElseThrow();

        if (!passwordEncoder.matches(memberDto.getPassword(), memberEntity.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        memberEntity.setPassword(passwordEncoder.encode(memberDto.getNewPassword()));

        return MemberDto.fromEntity(memberEntity);
    }

}
