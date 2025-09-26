package com.seongcheol.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.domain.BoardRoleCodeEntity;
import com.seongcheol.homemonitor.domain.BoardRoleEntity;
import com.seongcheol.homemonitor.domain.MemberRoleCodeEntity;

public interface BoardRoleRepository extends JpaRepository<BoardRoleEntity, Long> {
    public boolean existsByBoardAndBoardRoleCodeAndMemberRoleCode(BoardEntity boardEntity, BoardRoleCodeEntity boardRoleCodeEntity, MemberRoleCodeEntity memberRoleCodeEntity);
}
