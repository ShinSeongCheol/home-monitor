package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    
}
