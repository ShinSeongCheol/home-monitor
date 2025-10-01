package com.seongcheol.homemonitor.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.domain.BoardRoleCodeEntity;
import com.seongcheol.homemonitor.domain.BoardRoleEntity;
import com.seongcheol.homemonitor.domain.CommentEntity;
import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.MemberRoleCodeEntity;
import com.seongcheol.homemonitor.domain.PostEntity;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardRoleCodeDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeBoardRoleDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeCommentDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeMemberDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficeMemberRoleCodeDto;
import com.seongcheol.homemonitor.dto.backOffice.BackOfficePostDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeBoardRoleCodeRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeBoardRoleRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficeCommentRequestDto;
import com.seongcheol.homemonitor.dto.backOffice.request.BackOfficePostRequestDto;
import com.seongcheol.homemonitor.dto.request.BoardRequestDto;
import com.seongcheol.homemonitor.repository.BoardRepository;
import com.seongcheol.homemonitor.repository.BoardRoleCodeRepository;
import com.seongcheol.homemonitor.repository.BoardRoleRepository;
import com.seongcheol.homemonitor.repository.CommentRepository;
import com.seongcheol.homemonitor.repository.MemberRepository;
import com.seongcheol.homemonitor.repository.MemberRoleCodeRepository;
import com.seongcheol.homemonitor.repository.PostRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BackOfficeService {
    
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private  BoardRoleRepository boardRoleRepository;
    @Autowired
    private  BoardRoleCodeRepository boardRoleCodeRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberRoleCodeRepository memberRoleCodeRepository;

    public List<BackOfficeBoardDto> getBoards() {
        log.info("백오피스 게시판 조회 서비스");

        List<BoardEntity> boardEntities = boardRepository.findAll();

        return boardEntities.stream().map(BackOfficeBoardDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficeBoardDto postBoard(BoardRequestDto boardRequestDto) throws IllegalArgumentException {
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

        return BackOfficeBoardDto.fromEntity(boardRepository.save(boardEntity));
    }

    @Transactional
    public BackOfficeBoardDto putBoard(Long boardId, BoardRequestDto boardRequestDto) throws NoSuchElementException { 
        BoardEntity boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));

        boardEntity.setCategoryCode(boardRequestDto.getCode());
        boardEntity.setCategoryName(boardRequestDto.getName());
        boardEntity.setComment(boardRequestDto.getComment());
        boardEntity.setUpdatedAt(LocalDateTime.now());

        return BackOfficeBoardDto.fromEntity(boardEntity);
    }

    @Transactional
    public void deleteBoard(Long boardId) throws NoSuchElementException {
        boardRepository.findById(boardId).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));
        boardRepository.deleteById(boardId);
    }

    public List<BackOfficeBoardRoleDto> getBoardRoles() {
        List<BoardRoleEntity> boardRoleEntities = boardRoleRepository.findAll();
        return boardRoleEntities.stream().map(BackOfficeBoardRoleDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficeBoardRoleDto postBoardRole(BackOfficeBoardRoleRequestDto backOfficeBoardRoleRequestDto) throws NoSuchElementException, IllegalArgumentException{
        log.info("게시판 권한 추가 서비스");

        BoardEntity boardEntity = boardRepository.findById(backOfficeBoardRoleRequestDto.getBoardId()).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));
        BoardRoleCodeEntity boardRoleCodeEntity = boardRoleCodeRepository.findById(backOfficeBoardRoleRequestDto.getBoardRoleCodeId()).orElseThrow(() -> new NoSuchElementException("해당 게시판 권한 코드가 없습니다."));

        MemberRoleCodeEntity memberRoleCodeEntity = null;
        if(backOfficeBoardRoleRequestDto.getMemberRoleCodeId() != null) {
            memberRoleCodeEntity = memberRoleCodeRepository.findById(backOfficeBoardRoleRequestDto.getMemberRoleCodeId()).orElseThrow(() -> new NoSuchElementException("해당 사용자 권한 코드가 없습니다."));
        }

        // 중복 확인
        if(boardRoleRepository.existsByBoardAndBoardRoleCodeAndMemberRoleCode(boardEntity, boardRoleCodeEntity, memberRoleCodeEntity)) {
            throw new IllegalArgumentException("해당 게시판 권한이 존재합니다.");
        }

        BoardRoleEntity boardRoleEntity = BoardRoleEntity.builder()
        .board(boardEntity)
        .boardRoleCode(boardRoleCodeEntity)
        .memberRoleCode(memberRoleCodeEntity)
        .build();
        
        return BackOfficeBoardRoleDto.fromEntity(boardRoleRepository.save(boardRoleEntity));
    }

    @Transactional
    public BackOfficeBoardRoleDto putBoardRole(Long boardRoleId, BackOfficeBoardRoleRequestDto backOfficeBoardRoleRequestDto) {
        log.info("게시판 권한 수정 서비스");

        BoardEntity boardEntity = boardRepository.findById(backOfficeBoardRoleRequestDto.getBoardId()).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));
        BoardRoleCodeEntity boardRoleCodeEntity = boardRoleCodeRepository.findById(backOfficeBoardRoleRequestDto.getBoardRoleCodeId()).orElseThrow(() -> new NoSuchElementException("해당 게시판 권한 코드가 없습니다."));

        MemberRoleCodeEntity memberRoleCodeEntity = null;
        if(backOfficeBoardRoleRequestDto.getMemberRoleCodeId() != null) {
            memberRoleCodeEntity = memberRoleCodeRepository.findById(backOfficeBoardRoleRequestDto.getMemberRoleCodeId()).orElseThrow(() -> new NoSuchElementException("해당 사용자 권한 코드가 없습니다."));
        }

        // 중복 확인
        if(boardRoleRepository.existsByBoardAndBoardRoleCodeAndMemberRoleCode(boardEntity, boardRoleCodeEntity, memberRoleCodeEntity)) {
            throw new IllegalArgumentException("해당 게시판 권한이 존재합니다.");
        }

        BoardRoleEntity boardRoleEntity = boardRoleRepository.findById(boardRoleId).orElseThrow(() -> new NoSuchElementException("해당 게시판 권한이 없습니다."));
        boardRoleEntity.setBoard(boardEntity);
        boardRoleEntity.setBoardRoleCode(boardRoleCodeEntity);
        boardRoleEntity.setMemberRoleCode(memberRoleCodeEntity);

        return BackOfficeBoardRoleDto.fromEntity(boardRoleRepository.save(boardRoleEntity));
    }

    @Transactional
    public void deleteBoardRole(Long boardRoleId) {
        log.info("게시판 권한 삭제 서비스");

        boardRoleRepository.deleteById(boardRoleId);
    }

    public List<BackOfficeBoardRoleCodeDto> getBoardRoleCodes() {
        List<BoardRoleCodeEntity> boardRoleCodeEntities = boardRoleCodeRepository.findAll();
        return boardRoleCodeEntities.stream().map(BackOfficeBoardRoleCodeDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficeBoardRoleCodeDto postBoardRoleCode(BackOfficeBoardRoleCodeRequestDto requestDto) throws IllegalArgumentException {
        log.info("게시판 권한 코드 추가 서비스");

        if (boardRoleCodeRepository.findByCode(requestDto.getCode()).isPresent()) throw new IllegalArgumentException("해당 게시판 권한 코드가 존재합니다.");

        BoardRoleCodeEntity boardRoleCodeEntity = BoardRoleCodeEntity.builder()
        .code(requestDto.getCode())
        .name(requestDto.getName())
        .build();

        return BackOfficeBoardRoleCodeDto.fromEntity(boardRoleCodeRepository.save(boardRoleCodeEntity));
    }

    @Transactional
    public BackOfficeBoardRoleCodeDto putBoardRoleCode(Long boardRoleCodeId, BackOfficeBoardRoleCodeRequestDto requestDto) throws NoSuchElementException, IllegalArgumentException {
        log.info("게시판 권한 코드 수정 서비스");

        BoardRoleCodeEntity boardRoleCodeEntity = boardRoleCodeRepository.findById(boardRoleCodeId).orElseThrow(() -> new NoSuchElementException("해당 게시판 코드가 없습니다."));
        if(boardRoleCodeEntity.getCode().equals(requestDto.getCode()) != boardRoleCodeRepository.existsByCode(requestDto.getCode())) throw new IllegalArgumentException("해당 게시판 권한 코드가 존재합니다.");

        boardRoleCodeEntity.setCode(requestDto.getCode());
        boardRoleCodeEntity.setName(requestDto.getName());

        return BackOfficeBoardRoleCodeDto.fromEntity(boardRoleCodeEntity);
    }

    @Transactional
    public void deleteBoardRoleCode(Long boardRoleCodeId) {
        log.info("게시판 권한 코드 삭제 서비스");

        boardRoleCodeRepository.deleteById(boardRoleCodeId);
    }

    public List<BackOfficePostDto> getPosts() {
        log.info("게시물 조회 서비스");

        List<PostEntity> postEntities = postRepository.findAll();
        return postEntities.stream().map(BackOfficePostDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficePostDto postPost(BackOfficePostRequestDto requestDto) {
        log.info("게시물 추가 서비스");

        MemberEntity memberEntity = memberRepository.findById(requestDto.getMemberId()).orElseThrow(() -> new NoSuchElementException("해당 유저가 없습니다."));
        BoardEntity boardEntity = boardRepository.findById(requestDto.getBoardId()).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));

        LocalDateTime currentTime = LocalDateTime.now();

        PostEntity postEntity = PostEntity.builder()
        .member(memberEntity)
        .board(boardEntity)
        .title(requestDto.getTitle())
        .content(requestDto.getContent())
        .createdAt(currentTime)
        .updatedAt(currentTime)
        .view(0)
        .build();

        return BackOfficePostDto.fromEntity(postRepository.save(postEntity));
    }

    @Transactional
    public BackOfficePostDto putPost(Long postId, BackOfficePostRequestDto requestDto) throws NoSuchElementException {
        log.info("게시물 수정 서비스");

        PostEntity postEntity = postRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("해당 게시물이 없습니다."));
        MemberEntity memberEntity = memberRepository.findById(requestDto.getMemberId()).orElseThrow(() -> new NoSuchElementException("해당 유저가 없습니다."));
        BoardEntity boardEntity = boardRepository.findById(requestDto.getBoardId()).orElseThrow(() -> new NoSuchElementException("해당 게시판이 없습니다."));

        postEntity.setBoard(boardEntity);
        postEntity.setMember(memberEntity);
        postEntity.setTitle(requestDto.getTitle());
        postEntity.setContent(requestDto.getContent());
        postEntity.setUpdatedAt(LocalDateTime.now());

        return BackOfficePostDto.fromEntity(postRepository.save(postEntity));
    }

    @Transactional
    public void deletePost(Long postId) {
        log.info("게시물 삭제 서비스");

        postRepository.deleteById(postId);
    }

    public List<BackOfficeCommentDto> getComments() {
        log.info("댓글 조회 서비스");

        List<CommentEntity> commentEntities = commentRepository.findAll();
        return commentEntities.stream().map(BackOfficeCommentDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficeCommentDto postComment(BackOfficeCommentRequestDto requestDto) {
        log.info("댓글 등록 서비스");

        PostEntity postEntity = postRepository.findById(requestDto.getPostId()).orElseThrow(() -> new NoSuchElementException("해당 게시물이 없습니다."));
        MemberEntity memberEntity = memberRepository.findById(requestDto.getMemberId()).orElseThrow(() -> new NoSuchElementException("해당 사용자가 없습니다."));
        CommentEntity parentCommentEntity = null;
        if (requestDto.getParentCommentId() != null) {
            parentCommentEntity = commentRepository.findById(requestDto.getParentCommentId()).orElseThrow(() -> new NoSuchElementException("해당 부모 ID가 없습니다."));
        }

        LocalDateTime currentDateTime = LocalDateTime.now();

        CommentEntity commentEntity = CommentEntity.builder()
        .member(memberEntity)
        .post(postEntity)
        .content(requestDto.getContent())
        .parentComment(parentCommentEntity)
        .createdAt(currentDateTime)
        .updatedAt(currentDateTime)
        .build();

        return BackOfficeCommentDto.fromEntity(commentRepository.save(commentEntity));
    }

    @Transactional
    public BackOfficeCommentDto putComment(Long commentId, BackOfficeCommentRequestDto requestDto) {
        log.info("댓글 수정 서비스");

        PostEntity postEntity = postRepository.findById(requestDto.getPostId()).orElseThrow(() -> new NoSuchElementException("해당 게시물이 없습니다."));
        MemberEntity memberEntity = memberRepository.findById(requestDto.getMemberId()).orElseThrow(() -> new NoSuchElementException("해당 사용자가 없습니다."));
        CommentEntity parentCommentEntity = null;
        if (requestDto.getParentCommentId() != null) {
            parentCommentEntity = commentRepository.findById(requestDto.getParentCommentId()).orElseThrow(() -> new NoSuchElementException("해당 부모 ID가 없습니다."));
        }

        LocalDateTime currentDateTime = LocalDateTime.now();

        CommentEntity commentEntity = commentRepository.findById(commentId).orElseThrow(() -> new NoSuchElementException("해당 댓글이 없습니다."));
        commentEntity.setMember(memberEntity);
        commentEntity.setPost(postEntity);
        commentEntity.setContent(requestDto.getContent());
        commentEntity.setParentComment(parentCommentEntity);
        commentEntity.setUpdatedAt(currentDateTime);

        return BackOfficeCommentDto.fromEntity(commentRepository.save(commentEntity));
    }

    @Transactional
    public void deleteComment(Long commentId) {
        log.info("댓글 삭제 서비스");

        commentRepository.deleteById(commentId);
    }

    public List<BackOfficeMemberDto> getMembers() {
        log.info("사용자 조회 서비스");

        List<MemberEntity> memberEntities = memberRepository.findAll();
        return memberEntities.stream().map(BackOfficeMemberDto::fromEntity).toList();
    }

    public List<BackOfficeMemberRoleCodeDto> getMemberRoleCodes() {
        List<MemberRoleCodeEntity> memberRoleCodeEntities = memberRoleCodeRepository.findAll();
        return memberRoleCodeEntities.stream().map(BackOfficeMemberRoleCodeDto::fromEntity).toList();
    }

}
