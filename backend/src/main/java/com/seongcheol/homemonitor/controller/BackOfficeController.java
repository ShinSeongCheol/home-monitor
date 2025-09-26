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
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardRoleCodeDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardRoleDto;
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
    public ResponseEntity<List<BackOfficeBoardDto>> getBoards() {
        log.info("백오피스 게시판 조회 컨트롤러");

        List<BackOfficeBoardDto> backOfficeBoardDtos = backOfficeService.getBoards();

        return ResponseEntity.ok(backOfficeBoardDtos);
    }

    @PostMapping("/board")
    public ResponseEntity<BackOfficeBoardDto> postBoard(@RequestBody BoardRequestDto boardRequestDto) {
        log.info("백오피스 게시판 추가 컨트롤러");
        try {
            BackOfficeBoardDto backOfficeBoardDto = backOfficeService.postBoard(boardRequestDto);    
            return ResponseEntity.ok(backOfficeBoardDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/board/{boardId}")
    public ResponseEntity<BackOfficeBoardDto> putBoard(@PathVariable("boardId") Long boardId, @RequestBody BoardRequestDto boardRequestDto) {
        log.info("백오피스 게시판 수정 컨트롤러");

        try {
            BackOfficeBoardDto backOfficeBoardDto = backOfficeService.putBoard(boardId, boardRequestDto);
            return ResponseEntity.ok(backOfficeBoardDto);
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

    @GetMapping("/boardRole")
    public ResponseEntity<List<BackOfficeBoardRoleDto>> getBoardRoles() {
        log.info("백오피스 게시판 권한 조회 컨트롤러");

        List<BackOfficeBoardRoleDto> boardRoleDtos = backOfficeService.getBoardRoles();
        return ResponseEntity.ok(boardRoleDtos);
    }
    
}
