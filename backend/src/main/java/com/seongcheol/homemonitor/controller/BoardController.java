package com.seongcheol.homemonitor.controller;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import com.seongcheol.homemonitor.dto.request.CommentRequestDto;
import com.seongcheol.homemonitor.dto.request.PostRequestDto;
import com.seongcheol.homemonitor.dto.response.BoardResponseDto;
import com.seongcheol.homemonitor.dto.response.CommentResponseDto;
import com.seongcheol.homemonitor.dto.response.ImageResponseDto;
import com.seongcheol.homemonitor.dto.response.PostResponseDto;
import com.seongcheol.homemonitor.service.BoardService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


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

    @PutMapping("/{categoryCode}/{postId}")
    public ResponseEntity<PostResponseDto> putPostBy(@PathVariable(value = "categoryCode") String categoryCode, @PathVariable(value = "postId") Long postId, @RequestBody PostRequestDto postRequestDto) {
        log.info("게시판 {} 글 {} 수정 컨트롤러", categoryCode, postId);

        try {
            PostResponseDto postResponseDto  = boardService.putPost(categoryCode, postId, postRequestDto);
            return ResponseEntity.ok(postResponseDto);
        } catch (AccessDeniedException | IllegalArgumentException e) {
            log.error("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }

    }

    @DeleteMapping("/{categoryCode}/{postId}")
    public ResponseEntity<String> deletePostBy(@PathVariable(value = "categoryCode") String categoryCode, @PathVariable(value = "postId") Long postId) {
        log.info("게시판 {} 글 {} 삭제 컨트롤러", categoryCode, postId);
        boardService.deletePost(categoryCode, postId);
        return ResponseEntity.ok(null);
    }
    
    @PostMapping("/image")
    public ResponseEntity<ImageResponseDto> uploadImage(@RequestParam("upload") MultipartFile file) {
        log.debug("게시글 사진 저장 컨트롤러");
        try {
            ImageResponseDto imageResponseDto = boardService.uploadImage(file);
            return ResponseEntity.ok(imageResponseDto);
        } catch (MultipartException | IOException e) {
            log.error("Image Uplaod Error", e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @PostMapping("/{categoryCode}/{postId}/comment")
    public ResponseEntity<CommentResponseDto> postComment(@PathVariable(value = "categoryCode") String categoryCode, @PathVariable(value = "postId") Long postId, @RequestBody CommentRequestDto commentRequestDto) {
        log.info("게시판 {} 글 {} 댓글 등록 컨트롤러", categoryCode, postId);

        try {
            CommentResponseDto commentResponseDto = boardService.postComment(categoryCode, postId, commentRequestDto);
            return ResponseEntity.ok(commentResponseDto);
        } catch (AccessDeniedException | NoSuchElementException | IllegalArgumentException e) {
            log.error("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
        
    }
    
    @PutMapping("/{categoryCode}/{postId}/comment/{commentId}")
    public ResponseEntity<CommentResponseDto> putCommentBy(@PathVariable(value = "categoryCode") String categoryCode, @PathVariable(value = "postId") Long postId, @PathVariable(value = "commentId") Long commentId, @RequestBody CommentRequestDto commentRequestDto) {
        log.info("게시판 {} 글 {} 댓글 {} 수정 컨트롤러", categoryCode, postId, commentId);

        try {
            CommentResponseDto commentResponseDto = boardService.putComment(categoryCode, postId, commentId, commentRequestDto);
            return ResponseEntity.ok(commentResponseDto);
        } catch (AccessDeniedException | NoSuchElementException | IllegalArgumentException e) {
            log.error("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }

    }
    
    @DeleteMapping("/{categoryCode}/{postId}/comment/{commentId}")
    public ResponseEntity<String> deleteCommentBy(@PathVariable(value = "categoryCode") String categoryCode, @PathVariable(value = "postId") Long postId, @PathVariable(value = "commentId") Long commentId) {
        log.info("게시판 {} 글 {} 댓글 {} 삭제 컨트롤러", categoryCode, postId, commentId);

        try {
            boardService.deleteComment(categoryCode, postId, commentId);
            return ResponseEntity.ok(null);
        } catch (AccessDeniedException | NoSuchElementException | IllegalArgumentException e) {
            log.error("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
        
    }

    @PostMapping("/{categoryCode}/{postId}/comment/{commentId}/reply")
    public ResponseEntity<CommentResponseDto> replyComment(@PathVariable(value = "categoryCode") String categoryCode, @PathVariable(value = "postId") Long postId, @PathVariable(value = "commentId") Long commentId, @RequestBody CommentRequestDto commentRequestDto) {
        log.info("게시판 {} 글 {} 댓글 {} 댓글 달기 컨트롤러", categoryCode, postId, commentId);

        try {
            CommentResponseDto commentResponseDto = boardService.replyComment(categoryCode, postId, commentId, commentRequestDto);
            return ResponseEntity.ok(commentResponseDto);
        } catch (AccessDeniedException | NoSuchElementException | IllegalArgumentException e) {
            log.error("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
        
    }
}
