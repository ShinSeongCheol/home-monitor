package com.seongcheol.homemonitor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.PostEntity;
import com.seongcheol.homemonitor.domain.ReactionCodeEntity;
import com.seongcheol.homemonitor.domain.ReactionEntity;

public interface ReactionRepository extends JpaRepository<ReactionEntity, Long> {

    List<ReactionEntity> findAllByPostAndCommentIsNull(PostEntity postEntity);
    boolean existsByPostAndMemberAndCommentIsNull(PostEntity postEntity, MemberEntity memberEntity);
    void deleteByPostAndMemberAndReactionCodeAndCommentIsNull(PostEntity postEntity, MemberEntity memberEntity, ReactionCodeEntity reactionCodeEntity);
}
