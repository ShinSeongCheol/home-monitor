package com.seongcheol.homemonitor.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.domain.BoardRoleCodeEntity;
import com.seongcheol.homemonitor.domain.BoardRoleEntity;
import com.seongcheol.homemonitor.dto.BoardDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardRoleCodeDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardRoleDto;
import com.seongcheol.homemonitor.dto.request.BoardRequestDto;
import com.seongcheol.homemonitor.repository.BoardRepository;
import com.seongcheol.homemonitor.repository.BoardRoleCodeRepository;
import com.seongcheol.homemonitor.repository.BoardRoleRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BackOfficeService {
    
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private  BoardRoleRepository boardRoleRepository;
    @Autowired
    private  BoardRoleCodeRepository boardRoleCodeRepository;

    public List<BackOfficeBoardDto> getBoards() {
        log.info("백오피스 게시판 조회 서비스");

        List<BoardEntity> boardEntities = boardRepository.findAll();

        return boardEntities.stream().map(BackOfficeBoardDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficeBoardDto postBoard(BoardRequestDto boardRequestDto) throws IllegalArgumentException {
        log.info("백오피스 게시판 추가 서비스");

        if (!boardRepository.findByCategoryCode(boardRequestDto.getCode()).isEmpty()) throw new IllegalArgumentException("해당 카테고리 코드가 이미 존재합니다.");

        LocalDateTime localDateTime = LocalDateTime.now();

        BoardEntity boardEntity = BoardEntity.builder()
        .categoryCode(boardRequestDto.getCode())
        .categoryName(boardRequestDto.getName())
        .comment(boardRequestDto.getComment())
        .createdAt(localDateTime)
        .updatedAt(localDateTime)
        .build();

        return BackOfficeBoardDto.fromEntity(boardRepository.save(boardEntity));
    }

    @Transactional
    public BackOfficeBoardDto putBoard(Long boardId, BoardRequestDto boardRequestDto) throws NoSuchElementException { 
        BoardEntity boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));

        boardEntity.setCategoryCode(boardRequestDto.getCode());
        boardEntity.setCategoryName(boardRequestDto.getName());
        boardEntity.setComment(boardRequestDto.getComment());
        boardEntity.setUpdatedAt(LocalDateTime.now());

        return BackOfficeBoardDto.fromEntity(boardEntity);
    }

    @Transactional
    public void deleteBoard(Long boardId) throws NoSuchElementException {
        boardRepository.findById(boardId).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));
        boardRepository.deleteById(boardId);
    }

    public List<BackOfficeBoardRoleDto> getBoardRoles() {
        List<BoardRoleEntity> boardEntities = boardRoleRepository.findAll();
        return boardEntities.stream().map(BackOfficeBoardRoleDto::fromEntity).toList();
    }
}
