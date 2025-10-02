package com.seongcheol.homemonitor.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardRoleCodeDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardRoleDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeCommentDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeMemberDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeMemberRoleCodeDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeMemberRoleDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficePostDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeReactionDto;
import com.seongcheol.homemonitor.dto.backOffice.ReactionCodeDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeBoardRoleCodeRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeBoardRoleRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeCommentRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeMemberRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeMemberRoleCodeRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeMemberRoleRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficePostRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeReactionCodeRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeReactionRequestDto;
import com.seongcheol.homemonitor.dto.request.BoardRequestDto;
import com.seongcheol.homemonitor.service.BackOfficeService;

import lombok.extern.slf4j.Slf4j;




@Slf4j
@RestController
@PreAuthorize("hasRole('ADMIN')")
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

    @GetMapping("/boardRoles")
    public ResponseEntity<List<BackOfficeBoardRoleDto>> getBoardRoles() {
        log.info("백오피스 게시판 권한 조회 컨트롤러");

        List<BackOfficeBoardRoleDto> boardRoleDtos = backOfficeService.getBoardRoles();
        return ResponseEntity.ok(boardRoleDtos);
    }

    @PostMapping("/boardRole")
    public ResponseEntity<BackOfficeBoardRoleDto> postBoardRole(@RequestBody BackOfficeBoardRoleRequestDto backOfficeBoardRoleRequestDto) {
        log.info("백오피스 게시판 권한 추가 컨트롤러");

        try {
            BackOfficeBoardRoleDto backOfficeBoardRoleDto = backOfficeService.postBoardRole(backOfficeBoardRoleRequestDto);
            return ResponseEntity.ok(backOfficeBoardRoleDto);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/boardRole/{boardRoleId}")
    public ResponseEntity<BackOfficeBoardRoleDto> putBoardRole(@PathVariable("boardRoleId") Long boardRoleId, @RequestBody BackOfficeBoardRoleRequestDto backOfficeBoardRoleRequestDto) {
        log.info("백오피스 게시판 권한 수정 컨트롤러");

        try {
            BackOfficeBoardRoleDto backOfficeBoardRoleDto = backOfficeService.putBoardRole(boardRoleId, backOfficeBoardRoleRequestDto);
            return ResponseEntity.ok(backOfficeBoardRoleDto);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/boardRole/{boardRoleId}")
    public ResponseEntity<String> deleteBoardRole(@PathVariable("boardRoleId") Long boardRoleId) {
        log.info("백오피스 게시판 권한 삭제 컨트롤러");

        backOfficeService.deleteBoardRole(boardRoleId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/boardRoleCodes")
    public ResponseEntity<List<BackOfficeBoardRoleCodeDto>> getBoardRoleCodes() {
        log.info("백오피스 게시판 권한 코드 조회 컨트롤러");

        List<BackOfficeBoardRoleCodeDto> boardRoleDtos = backOfficeService.getBoardRoleCodes();
        return ResponseEntity.ok(boardRoleDtos);
    }

    @PostMapping("/boardRoleCodes")
    public ResponseEntity<BackOfficeBoardRoleCodeDto> postBoardRoleCode(@RequestBody BackOfficeBoardRoleCodeRequestDto requestDto) {
        log.info("게시판 권한 코드 추가 컨트롤러");

        try {
            BackOfficeBoardRoleCodeDto backBoardRoleCodeDto = backOfficeService.postBoardRoleCode(requestDto);
            return ResponseEntity.ok(backBoardRoleCodeDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).build();
        }
    }

    @PutMapping("/boardRoleCodes/{boardRoleCodeId}")
    public ResponseEntity<BackOfficeBoardRoleCodeDto> putBoardRoleCode(@PathVariable("boardRoleCodeId") Long boardRoleCodeId, @RequestBody BackOfficeBoardRoleCodeRequestDto requestDto) {
        log.info("게시판 권한 코드 추가 컨트롤러");

        try {
            BackOfficeBoardRoleCodeDto backBoardRoleCodeDto = backOfficeService.putBoardRoleCode(boardRoleCodeId, requestDto);
            return ResponseEntity.ok(backBoardRoleCodeDto);
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/boardRoleCodes/{boardRoleCodeId}")
    public ResponseEntity<String> deleteBoardRoleCode(@PathVariable("boardRoleCodeId") Long boardRoleCodeId) {
        log.info("백오피스 게시판 권한 삭제 컨트롤러");

        backOfficeService.deleteBoardRoleCode(boardRoleCodeId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/posts")
    public ResponseEntity<List<BackOfficePostDto>> getPosts() {
        log.info("백오피스 게시물 조회 컨트롤러");

        List<BackOfficePostDto> backOfficePostDtos = backOfficeService.getPosts();
        return ResponseEntity.ok(backOfficePostDtos);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<BackOfficePostDto> getPost(@PathVariable("postId") Long postId) {
        log.info("백오피스 특정 게시물 조회 컨트롤러");

        try {
            BackOfficePostDto backOfficePostDto = backOfficeService.getPost(postId);
            return ResponseEntity.ok(backOfficePostDto);
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PostMapping("/posts")
    public ResponseEntity<BackOfficePostDto> postPost(@RequestBody BackOfficePostRequestDto requestDto) {
        log.info("백오피스 게시물 추가 컨트롤러");

        try {
            BackOfficePostDto backOfficePostDto = backOfficeService.postPost(requestDto);
            return ResponseEntity.ok(backOfficePostDto);
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/posts/{postId}")
    public ResponseEntity<BackOfficePostDto> putPost(@PathVariable("postId") Long postId, @RequestBody BackOfficePostRequestDto requestDto) {
        log.info("백오피스 게시물 수정 컨트롤러");

        try {
            BackOfficePostDto backOfficePostDto = backOfficeService.putPost(postId, requestDto);
            return ResponseEntity.ok(backOfficePostDto);
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable("postId") Long postId) {
        log.info("백오피스 게시물 삭제 컨트롤러");

        backOfficeService.deletePost(postId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/comments")
    public ResponseEntity<List<BackOfficeCommentDto>> getComments() {
        log.info("댓글 조회 컨트롤러");

        List<BackOfficeCommentDto> backOfficeCommentDtos = backOfficeService.getComments();
        return ResponseEntity.ok(backOfficeCommentDtos);
    }

    @PostMapping("/comments")
    public ResponseEntity<BackOfficeCommentDto> postComment(@RequestBody BackOfficeCommentRequestDto requestDto) {
        log.info("댓글 추가 컨트롤러");
        
        try {
            BackOfficeCommentDto backOfficeCommentDto = backOfficeService.postComment(requestDto);
            return ResponseEntity.ok(backOfficeCommentDto);
        }
        catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<BackOfficeCommentDto> putComment(@PathVariable("commentId") Long commentId, @RequestBody BackOfficeCommentRequestDto requestDto) {
        log.info("댓글 수정 컨트롤러");

        try {
            BackOfficeCommentDto backOfficeCommentDto = backOfficeService.putComment(commentId, requestDto);
            return ResponseEntity.ok(backOfficeCommentDto);
        }
        catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") Long commentId) {
        log.info("댓글 삭제 컨트롤러");

        backOfficeService.deleteComment(commentId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
    
    @GetMapping("/reactions")
    public ResponseEntity<List<BackOfficeReactionDto>> getReactions() {
        log.info("리액션 조회 컨트롤러");

        List<BackOfficeReactionDto> backOfficeReactionDtos = backOfficeService.getReactions();

        return ResponseEntity.ok(backOfficeReactionDtos);
    }

    @PostMapping("/reactions")
    public ResponseEntity<BackOfficeReactionDto> postReaction(@RequestBody BackOfficeReactionRequestDto requestDto) {
        log.info("리액션 추가 컨트롤러");

        try {
            BackOfficeReactionDto backOfficeReactionDto = backOfficeService.postReaction(requestDto);
            return ResponseEntity.ok(backOfficeReactionDto);
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/reactions/{reactionId}")
    public ResponseEntity<BackOfficeReactionDto> putReactions(@PathVariable("reactionId") Long reactionId, @RequestBody BackOfficeReactionRequestDto requestDto) {
        log.info("리액션 수정 컨트롤러");

        try {
            BackOfficeReactionDto backOfficeReactionDto = backOfficeService.putReaction(reactionId, requestDto);
            return ResponseEntity.ok(backOfficeReactionDto);
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/reactions/{reactionId}")
    public ResponseEntity<String> deleteReaction(@PathVariable("reactionId") Long reactionId) {
        log.info("리액션 삭제 컨트롤러");

        backOfficeService.deleteReaction(reactionId);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/reactionCodes")
    public ResponseEntity<List<ReactionCodeDto>> getReactionCodes() {
        log.info("리액션 코드 조회 컨트롤러");

        List<ReactionCodeDto> reactionCodeDtos = backOfficeService.getReactionCodes();
        return ResponseEntity.ok(reactionCodeDtos);
    }

    @PostMapping("/reactionCodes")
    public ResponseEntity<ReactionCodeDto> postReactionCode(@RequestBody BackOfficeReactionCodeRequestDto requestDto) {
        log.info("리액션 코드 추가 컨트롤러");
        try {
            ReactionCodeDto reactionCodeDto = backOfficeService.postReactionCode(requestDto);
            return ResponseEntity.ok(reactionCodeDto);
        } 
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    
    @PutMapping("/reactionCodes/{reactionCodeId}")
    public ResponseEntity<ReactionCodeDto> putReactionCode(@PathVariable("reactionCodeId") Long reactionCodeId, @RequestBody BackOfficeReactionCodeRequestDto requestDto) {
        log.info("리액션 코드 수정 컨트롤러");

        try {
            ReactionCodeDto reactionCodeDto = backOfficeService.putReactionCode(reactionCodeId, requestDto);
            return ResponseEntity.ok(reactionCodeDto);
        } 
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @DeleteMapping("/reactionCodes/{reactionCodeId}")
    public ResponseEntity<String> deleteReactionCode(@PathVariable("reactionCodeId") Long reactionCodeId) {
        log.info("리액션 코드 삭제 컨트롤러");

        backOfficeService.deleteReactionCode(reactionCodeId);
        return ResponseEntity.ok(null);
    }
    
    @GetMapping("/members")
    public ResponseEntity<List<BackOfficeMemberDto>> getMembers() {
        log.info("사용자 조회 컨트롤러");

        List<BackOfficeMemberDto> backOfficeMemberResponseDtos = backOfficeService.getMembers();
        return ResponseEntity.ok(backOfficeMemberResponseDtos);
    }

    @PostMapping("/members")
    public ResponseEntity<BackOfficeMemberDto> postMember(@RequestBody BackOfficeMemberRequestDto requestDto) {
        log.info("백오피스 사용자 권한 코드 추가 컨트롤러");

        try {
            BackOfficeMemberDto memberDto = backOfficeService.postMember(requestDto);
            return ResponseEntity.ok(memberDto);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/members/{memberId}")
    public ResponseEntity<BackOfficeMemberDto> putMember(@PathVariable("memberId") Long memberId, @RequestBody BackOfficeMemberRequestDto requestDto) {
        log.info("백오피스 사용자 권한 코드 수정 컨트롤러");
        try {
            BackOfficeMemberDto memberDto = backOfficeService.putMember(memberId, requestDto);
            return ResponseEntity.ok(memberDto);
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/members/{memberId}")
    public ResponseEntity<String> deleteMember(@PathVariable("memberId") Long memberId) {
        log.info("백오피스 사용자 삭제 컨트롤러");

        backOfficeService.deleteMember(memberId);
        return ResponseEntity.ok(null);
    }
    

    @GetMapping("/memberRoles")
    public ResponseEntity<List<BackOfficeMemberRoleDto>> getMemberRoles() {
        log.info("백오피스 사용자 권한 코드 조회 컨트롤러");

        List<BackOfficeMemberRoleDto> memberRoleDtos = backOfficeService.getMemberRoles();
        return ResponseEntity.ok(memberRoleDtos);
    }

    @PostMapping("/memberRoles")
    public ResponseEntity<BackOfficeMemberRoleDto> postMemberRole(@RequestBody BackOfficeMemberRoleRequestDto requestDto) {
        log.info("백오피스 사용자 권한 코드 추가 컨트롤러");

        try {
            BackOfficeMemberRoleDto memberRoleDto = backOfficeService.postMemberRole(requestDto);
            return ResponseEntity.ok(memberRoleDto);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/memberRoles/{memberRoleId}")
    public ResponseEntity<BackOfficeMemberRoleDto> putMemberRole(@PathVariable("memberRoleId") Long memberRoleId, @RequestBody BackOfficeMemberRoleRequestDto requestDto) {
        log.info("백오피스 사용자 권한 코드 수정 컨트롤러");
        try {
            BackOfficeMemberRoleDto memberRoleDto = backOfficeService.putMemberRole(memberRoleId, requestDto);
            return ResponseEntity.ok(memberRoleDto);
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/memberRoles/{memberRoleId}")
    public ResponseEntity<String> deleteMemberRole(@PathVariable("memberRoleId") Long memberRoleId) {
        log.info("백오피스 사용자 권한 코드 삭제 컨트롤러");

        backOfficeService.deleteMemberRole(memberRoleId);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/memberRoleCodes")
    public ResponseEntity<List<BackOfficeMemberRoleCodeDto>> getMemberRoleCodes() {
        log.info("백오피스 사용자 권한 코드 조회 컨트롤러");

        List<BackOfficeMemberRoleCodeDto> boardRoleDtos = backOfficeService.getMemberRoleCodes();
        return ResponseEntity.ok(boardRoleDtos);
    }

    @PostMapping("/memberRoleCodes")
    public ResponseEntity<BackOfficeMemberRoleCodeDto> postMemberRoleCode(@RequestBody BackOfficeMemberRoleCodeRequestDto requestDto) {
        log.info("백오피스 사용자 권한 코드 추가 컨트롤러");

        try {
            BackOfficeMemberRoleCodeDto boardRoleDtos = backOfficeService.postMemberRoleCode(requestDto);
            return ResponseEntity.ok(boardRoleDtos);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/memberRoleCodes/{memberRoleCodeId}")
    public ResponseEntity<BackOfficeMemberRoleCodeDto> putMemberRoleCode(@PathVariable("memberRoleCodeId") Long memberRoleCodeId, @RequestBody BackOfficeMemberRoleCodeRequestDto requestDto) {
        log.info("백오피스 사용자 권한 코드 수정 컨트롤러");
        try {
            BackOfficeMemberRoleCodeDto memberRoleCodeDto = backOfficeService.putMemberRoleCode(memberRoleCodeId, requestDto);
            return ResponseEntity.ok(memberRoleCodeDto);
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/memberRoleCodes/{memberRoleCodeId}")
    public ResponseEntity<String> deleteMemberRoleCode(@PathVariable("memberRoleCodeId") Long memberRoleCodeId) {
        log.info("백오피스 사용자 권한 코드 삭제 컨트롤러");

        backOfficeService.deleteMemberRoleCode(memberRoleCodeId);
        return ResponseEntity.ok(null);
    }
}
