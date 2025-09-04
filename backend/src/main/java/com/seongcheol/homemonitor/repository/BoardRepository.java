package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.BoardEntity;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    
}
