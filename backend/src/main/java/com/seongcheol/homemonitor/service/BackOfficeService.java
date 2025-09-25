package com.seongcheol.homemonitor.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.dto.BoardDto;
import com.seongcheol.homemonitor.dto.request.BoardRequestDto;
import com.seongcheol.homemonitor.repository.BoardRepository;
import com.seongcheol.homemonitor.repository.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BackOfficeService {
    
    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private MemberRepository memberRepository;

    public List<BoardDto> getBoards() {
        log.info("백오피스 게시판 조회 서비스");

        List<BoardEntity> boardEntities = boardRepository.findAll();

        return boardEntities.stream().map(BoardDto::fromEntity).toList();
    }

    @Transactional
    public BoardDto postBoard(BoardRequestDto boardRequestDto) throws IllegalArgumentException {
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

        return BoardDto.fromEntity(boardRepository.save(boardEntity));
    }

    @Transactional
    public BoardDto putBoard(Long boardId, BoardRequestDto boardRequestDto) throws NoSuchElementException { 
        BoardEntity boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));

        boardEntity.setCategoryName(boardRequestDto.getName());
        boardEntity.setComment(boardRequestDto.getComment());

        return BoardDto.fromEntity(boardEntity);
    }

    @Transactional
    public void deleteBoard(Long boardId) throws NoSuchElementException {
        boardRepository.findById(boardId).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));
        boardRepository.deleteById(boardId);
    }

}
