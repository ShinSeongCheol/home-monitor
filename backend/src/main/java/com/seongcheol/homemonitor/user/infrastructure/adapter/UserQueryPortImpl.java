package com.seongcheol.homemonitor.user.infrastructure.adapter;

import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.application.port.out.UserQueryPort;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserEntity;
import com.seongcheol.homemonitor.user.infrastructure.mapper.UserMapper;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;

@Component
@RequiredArgsConstructor
public class UserQueryPortImpl implements UserQueryPort {

    private final UserRepository userJpaRepository;

    @Override
    public User save(User user) {
        UserEntity userEntity = userJpaRepository.save(UserMapper.toEntity(user));
        return UserMapper.toDomain(userEntity);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userJpaRepository.existsByEmail(email);
    }

    @Override
    public User findByEmail(String email) {
        return userJpaRepository.findByEmail(email).map(UserMapper::toDomain).orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
    }
}
