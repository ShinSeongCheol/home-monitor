package com.seongcheol.homemonitor.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.repository.MemberRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        MemberEntity memberEntity = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("사용자 없음"));

        return User.builder()
            .username(memberEntity.getName())
            .password(memberEntity.getPassword())
            .authorities(memberEntity.getRole().toArray(new String[0]))
            .build();
    }
    
}
