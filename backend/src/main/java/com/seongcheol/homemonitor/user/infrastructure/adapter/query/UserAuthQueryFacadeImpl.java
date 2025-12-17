package com.seongcheol.homemonitor.user.infrastructure.adapter.query;

import com.seongcheol.homemonitor.user.facade.query.UserAuthQueryFacade;
import com.seongcheol.homemonitor.user.facade.query.dto.UserAuthDto;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserEntity;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleCodeEntity;
import com.seongcheol.homemonitor.user.infrastructure.entity.UserRoleEntity;
import com.seongcheol.homemonitor.user.infrastructure.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;

@Component
@RequiredArgsConstructor
public class UserAuthQueryFacadeImpl implements UserAuthQueryFacade {

    private final UserRepository userJpaRepository;

    @Override
    public UserAuthDto findForAuthByEmail(String email) {

        UserEntity userEntity = userJpaRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("해당 사용자는 존재하지 않습니다."));

        return new UserAuthDto(
                userEntity.getEmail(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.getRoles().stream().map(UserRoleEntity::getUserRoleCode).map(UserRoleCodeEntity::getCode).toList()
        );
    }
}
