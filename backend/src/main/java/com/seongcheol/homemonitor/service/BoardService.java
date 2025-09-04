package com.seongcheol.homemonitor.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.dto.response.BoardResponseDto;
import com.seongcheol.homemonitor.repository.BoardRepository;

@Service
public class BoardService {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private BoardRepository boardRepository;

    public List<BoardResponseDto> getBoards() {
        logger.debug("게시판 종류 조회 서비스");
        List<BoardEntity> BoardEntities = boardRepository.findAll();
        List<BoardResponseDto> boardResponseDtos = BoardEntities.stream().map(boardEntity -> BoardResponseDto.fromEntity(boardEntity)).toList();
        return boardResponseDtos;
    }

}
