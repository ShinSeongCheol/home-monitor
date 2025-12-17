package com.seongcheol.homemonitor.user.infrastructure.adapter;

import com.seongcheol.homemonitor.user.application.port.out.SocialAccountQueryPort;
import com.seongcheol.homemonitor.user.domain.model.SocialAccount;
import com.seongcheol.homemonitor.user.domain.model.User;
import com.seongcheol.homemonitor.user.infrastructure.entity.SocialAccountEntity;
import com.seongcheol.homemonitor.user.infrastructure.mapper.SocialAccountMapper;
import com.seongcheol.homemonitor.user.infrastructure.repository.SocialAccountJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SocialAccountImpl implements SocialAccountQueryPort {

    private final SocialAccountJpaRepository socialAccountJpaRepository;

    @Override
    public SocialAccount save(User user, SocialAccount socialAccount) {
        SocialAccountEntity socialAccountEntity = socialAccountJpaRepository.save(SocialAccountMapper.toEntity(user, socialAccount));
        return  SocialAccountMapper.toDomain(socialAccountEntity);
    }

    @Override
    public boolean existsByProviderIdAndProvider(Long providerId, String provider) {
        return socialAccountJpaRepository.existsByProviderIdAndProvider(providerId, provider);
    }
}
