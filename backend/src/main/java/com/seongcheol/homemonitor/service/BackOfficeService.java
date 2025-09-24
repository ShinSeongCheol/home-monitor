package com.seongcheol.homemonitor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.dto.BoardDto;
import com.seongcheol.homemonitor.repository.BoardRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BackOfficeService {
    
    @Autowired
    private BoardRepository boardRepository;

    public List<BoardDto> getBoards() {
        log.info("게시판 조회 서비스");

        List<BoardEntity> boardEntities = boardRepository.findAll();

        return boardEntities.stream().map(BoardDto::fromEntity).toList();
    }

}
