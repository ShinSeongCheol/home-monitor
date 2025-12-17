package com.seongcheol.homemonitor.auth.infrastructure.security;

import com.seongcheol.homemonitor.user.facade.query.UserAuthQueryFacade;
import com.seongcheol.homemonitor.user.facade.query.dto.UserAuthDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserAuthQueryFacade userAuthQueryFacade;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserAuthDto userAuthDto = userAuthQueryFacade.findForAuthByEmail(email);

        return UserDetailsImpl.builder()
                .email(userAuthDto.email())
                .username(userAuthDto.username())
                .password(userAuthDto.password())
                .authorities(userAuthDto.roles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()))
                .build();
    }
}
