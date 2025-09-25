package com.seongcheol.homemonitor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.BoardEntity;


public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    Optional<BoardEntity> findByCategoryCode(String categoryCode);
}
