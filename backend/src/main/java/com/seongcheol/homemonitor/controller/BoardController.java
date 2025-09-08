package com.seongcheol.homemonitor.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.request.PostRequestDto;
import com.seongcheol.homemonitor.dto.response.BoardResponseDto;
import com.seongcheol.homemonitor.dto.response.PostResponseDto;
import com.seongcheol.homemonitor.service.BoardService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@Slf4j
@RestController
@RequestMapping("/api/v1/boards")
public class BoardController {
    
    @Autowired
    private BoardService boardService;

    @GetMapping
    public List<BoardResponseDto> getBoards() {
        log.debug("게시판 종류 조회 컨트롤러");
        List<BoardResponseDto> boardResponseDtos = boardService.getBoards();
        return boardResponseDtos;
    }

    @GetMapping("/{categoryCode}")
    public BoardResponseDto getBoardBy(@PathVariable(value = "categoryCode") String categoryCode) {
        BoardResponseDto boardResponseDto = boardService.getBoard(categoryCode);
        return boardResponseDto;
    }

    @PostMapping("/{categoryCode}/post")
    public ResponseEntity<PostResponseDto> postBoard(@PathVariable(value = "categoryCode") String categoryCode, @RequestBody PostRequestDto postRequestDto) {
        log.debug("게시판 {} 글 등록 컨트롤러", categoryCode);
        PostResponseDto postResponseDto = boardService.postBoard(categoryCode, postRequestDto);
        return ResponseEntity.ok(postResponseDto);
    }

    @GetMapping("/{categoryCode}/{postId}")
    public ResponseEntity<PostResponseDto> getPostBy(@PathVariable(value = "categoryCode") String categoryCode, @PathVariable(value = "postId") Long postId) {
        log.debug("게시판 {} 글 {} 조회 컨트롤러", categoryCode, postId);

        PostResponseDto postResponseDto = boardService.getPost(categoryCode, postId);

        return ResponseEntity.ok(postResponseDto);
    }
    
}
