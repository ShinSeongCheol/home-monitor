package com.seongcheol.homemonitor.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.response.BoardResponseDto;
import com.seongcheol.homemonitor.service.BoardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/v1/boards")
public class BoardController {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private BoardService boardService;

    @GetMapping
    public List<BoardResponseDto> getBoards() {
        logger.debug("게시판 종류 조회 컨트롤러");
        List<BoardResponseDto> boardResponseDtos = boardService.getBoards();
        return boardResponseDtos;
    }
    

}
