package com.seongcheol.homemonitor.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.dto.UserDetailsImpl;
import com.seongcheol.homemonitor.repository.MemberRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        logger.debug("스프링 시큐리티 userDetailService 구현체");

        MemberEntity memberEntity = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("사용자 없음"));
        List<GrantedAuthority> authorities = memberEntity.getRole().stream().map(memberRole -> new SimpleGrantedAuthority(memberRole.getRole())).collect(Collectors.toList());

        return UserDetailsImpl.builder()
            .email(memberEntity.getEmail())
            .username(memberEntity.getUsername())
            .password(memberEntity.getPassword())
            .authorities(authorities)
            .build();
    }
    
}
