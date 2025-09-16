package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seongcheol.homemonitor.domain.CommentEntity;
import com.seongcheol.homemonitor.domain.PostEntity;

import java.util.List;


public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    @Query(
    """
        SELECT c
        FROM CommentEntity c
        WHERE c.post = :post
        AND c.parentComment IS NULL
    """)
    List<CommentEntity> findCommentsWithoutParent(@Param("post") PostEntity post);
}
