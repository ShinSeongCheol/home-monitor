package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.PostEntity;

public interface PostRepository extends JpaRepository<PostEntity, Long>{
    
}
