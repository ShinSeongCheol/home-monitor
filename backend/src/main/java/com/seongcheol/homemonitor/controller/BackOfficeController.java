package com.seongcheol.homemonitor.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.BoardDto;
import com.seongcheol.homemonitor.dto.request.BoardRequestDto;
import com.seongcheol.homemonitor.service.BackOfficeService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api/v1/backoffice")
public class BackOfficeController {

    @Autowired
    private BackOfficeService backOfficeService;

    @GetMapping("/boards")
    public ResponseEntity<List<BoardDto>> getBoards() {
        log.info("백오피스 게시판 조회 컨트롤러");

        List<BoardDto> boardDtos = backOfficeService.getBoards();

        return ResponseEntity.ok(boardDtos);
    }

    @PostMapping("/board")
    public ResponseEntity<BoardDto> postBoard(@RequestBody BoardRequestDto boardRequestDto) {
        log.info("백오피스 게시판 추가 컨트롤러");
        try {
            BoardDto boardDto = backOfficeService.postBoard(boardRequestDto);    
            return ResponseEntity.ok(boardDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/board/{boardId}")
    public ResponseEntity<BoardDto> putBoard(@PathVariable("boardId") Long boardId, @RequestBody BoardRequestDto boardRequestDto) {
        log.info("백오피스 게시판 수정 컨트롤러");

        try {
            BoardDto boardDto = backOfficeService.putBoard(boardId, boardRequestDto);
            return ResponseEntity.ok(boardDto);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/board/{boardId}")
    public ResponseEntity<String> deleteBoard(@PathVariable("boardId") Long boardId) {
        log.info("백오피스 게시판 삭제 컨트롤러");

        try {
            backOfficeService.deleteBoard(boardId);
            return ResponseEntity.ok(null);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
