package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.ReactionEntity;

public interface ReactionRepository extends JpaRepository<ReactionEntity, Long> {
    
    

}
