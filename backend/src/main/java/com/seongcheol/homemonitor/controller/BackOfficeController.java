package com.seongcheol.homemonitor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.BoardDto;
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
        log.info("관리자 게시판 조회 컨트롤러");

        List<BoardDto> boardDtos = backOfficeService.getBoards();

        return ResponseEntity.ok(boardDtos);
    }

}
