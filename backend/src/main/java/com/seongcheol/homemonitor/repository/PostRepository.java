package com.seongcheol.homemonitor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seongcheol.homemonitor.domain.PostEntity;

public interface PostRepository extends JpaRepository<PostEntity, Long>{
    
    @Query("""
        SELECT DISTINCT p
        FROM PostEntity p
        LEFT JOIN FETCH p.comments c
        WHERE p.id = :postId
        AND (c.parent_comment IS NULL OR c IS NULL)
    """)
    Optional<PostEntity> findPostsWitoutParentComments(@Param("postId") Long postId);

}
