package com.seongcheol.homemonitor.user.infrastructure.adapter;

import com.seongcheol.homemonitor.user.application.port.out.UserRoleCodeQueryPort;
import com.seongcheol.homemonitor.user.domain.model.UserRoleCode;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserEntity;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleCodeEntity;
import com.seongcheol.homemonitor.user.infrastructure.mapper.UserRoleCodeMapper;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRoleCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserRoleCodeQueryPortImpl implements UserRoleCodeQueryPort {

    private final UserRoleCodeRepository userRoleCodeRepository;

    @Override
    public List<UserRoleCode> findAllById(List<Long> id) {
        return userRoleCodeRepository.findAllById(id).stream().map(UserRoleCodeMapper::toDomain).toList();
    }

    @Override
    public UserRoleCode findById(Long id) {
        UserRoleCodeEntity userRoleCodeEntity = userRoleCodeRepository.findById(id).orElseThrow(() -> new NoSuchElementException("해당 이메일을 가진 사용자는 없습니다."));
        return  UserRoleCodeMapper.toDomain(userRoleCodeEntity);
    }

    @Override
    public Optional<UserRoleCode> findByCode(String code) {
        return userRoleCodeRepository.findByCode(code).map(UserRoleCodeMapper::toDomain);
    }

    @Override
    public boolean existsByCode(String code) {
        return userRoleCodeRepository.existsByCode(code);
    }

    @Override
    public UserRoleCode save(String code, String name) {
        UserRoleCodeEntity userRoleCodeEntity = UserRoleCodeEntity.builder()
                .code(code)
                .name(name)
                .build();

        UserRoleCodeEntity savedUserRoleCodeEntity = userRoleCodeRepository.save(userRoleCodeEntity);
        return UserRoleCodeMapper.toDomain(savedUserRoleCodeEntity);
    }
}
