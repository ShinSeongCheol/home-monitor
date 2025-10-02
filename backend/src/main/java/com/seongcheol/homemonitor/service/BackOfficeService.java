package com.seongcheol.homemonitor.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.domain.BoardRoleCodeEntity;
import com.seongcheol.homemonitor.domain.BoardRoleEntity;
import com.seongcheol.homemonitor.domain.CommentEntity;
import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.MemberRoleCodeEntity;
import com.seongcheol.homemonitor.domain.MemberRoleEntity;
import com.seongcheol.homemonitor.domain.PostEntity;
import com.seongcheol.homemonitor.domain.ReactionCodeEntity;
import com.seongcheol.homemonitor.domain.ReactionEntity;
import com.seongcheol.homemonitor.domain.SocialAccountEntity;
import com.seongcheol.homemonitor.dto.MemberDto;
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
import com.seongcheol.homemonitor.repository.BoardRepository;
import com.seongcheol.homemonitor.repository.BoardRoleCodeRepository;
import com.seongcheol.homemonitor.repository.BoardRoleRepository;
import com.seongcheol.homemonitor.repository.CommentRepository;
import com.seongcheol.homemonitor.repository.MemberRepository;
import com.seongcheol.homemonitor.repository.MemberRoleCodeRepository;
import com.seongcheol.homemonitor.repository.MemberRoleRepository;
import com.seongcheol.homemonitor.repository.PostRepository;
import com.seongcheol.homemonitor.repository.ReactionCodeRepository;
import com.seongcheol.homemonitor.repository.ReactionRepository;
import com.seongcheol.homemonitor.repository.SocialAccountRepository;

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
    private ReactionRepository reactionRepository;
    @Autowired
    private ReactionCodeRepository reactionCodeRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private SocialAccountRepository socialAccountRepository;
    @Autowired
    private MemberRoleRepository memberRoleRepository;
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

    public BackOfficePostDto getPost(Long postId) {
        log.info("특정 게시물 조회 서비스");

        PostEntity postEntity = postRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("해당 게시물이 없습니다."));
        return BackOfficePostDto.fromEntity(postEntity);
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

    public List<BackOfficeReactionDto> getReactions() {
        log.info("리액션 조회 서비스");

        List<ReactionEntity> reactionEntities = reactionRepository.findAll();
        return reactionEntities.stream().map(BackOfficeReactionDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficeReactionDto postReaction(BackOfficeReactionRequestDto requestDto) {
        log.info("리액션 추가 서비스");

        MemberEntity memberEntity = memberRepository.findById(requestDto.getMemberId()).orElseThrow(() -> new NoSuchElementException("해당 사용자가 없습니다."));
        PostEntity postEntity = postRepository.findById(requestDto.getPostId()).orElseThrow(() -> new NoSuchElementException("해당 게시물이 없습니다."));
        ReactionCodeEntity reactionCodeEntity = reactionCodeRepository.findById(requestDto.getReactionCodeId()).orElseThrow(() -> new NoSuchElementException("해당 반응 코드가 없습니다."));

        CommentEntity commentEntity = null;
        if (requestDto.getCommentId() != null) {
            commentEntity = commentRepository.findById(requestDto.getCommentId()).orElseThrow(() -> new NoSuchElementException("해당 댓글이 없습니다."));
        }

        if (commentEntity == null) {
            if (reactionRepository.existsByPostAndMemberAndReactionCodeAndCommentIsNull(postEntity, memberEntity, reactionCodeEntity)) {
                throw new IllegalArgumentException("해당 반응은 이미 존재합니다.");
            }
        }else {
            if (reactionRepository.existsByPostAndMemberAndReactionCodeAndComment(postEntity, memberEntity, reactionCodeEntity, commentEntity)) {
                throw new IllegalArgumentException("해당 반응은 이미 존재합니다.");
            }
        }

        ReactionEntity reactionEntity = ReactionEntity.builder()
        .comment(commentEntity)
        .member(memberEntity)
        .post(postEntity)
        .reactionCode(reactionCodeEntity)
        .build();
        
        return BackOfficeReactionDto.fromEntity(reactionRepository.save(reactionEntity));
    }

    @Transactional
    public BackOfficeReactionDto putReaction(Long reactionId, BackOfficeReactionRequestDto requestDto) {
        log.info("리액션 수정 서비스");

        MemberEntity memberEntity = memberRepository.findById(requestDto.getMemberId()).orElseThrow(() -> new NoSuchElementException("해당 사용자가 없습니다."));
        PostEntity postEntity = postRepository.findById(requestDto.getPostId()).orElseThrow(() -> new NoSuchElementException("해당 게시물이 없습니다."));
        ReactionCodeEntity reactionCodeEntity = reactionCodeRepository.findById(requestDto.getReactionCodeId()).orElseThrow(() -> new NoSuchElementException("해당 반응 코드가 없습니다."));

        CommentEntity commentEntity = null;
        if (requestDto.getCommentId() != null) {
            commentEntity = commentRepository.findById(requestDto.getCommentId()).orElseThrow(() -> new NoSuchElementException("해당 댓글이 없습니다."));
        }

        if (commentEntity == null) {
            if (reactionRepository.existsByPostAndMemberAndReactionCodeAndCommentIsNull(postEntity, memberEntity, reactionCodeEntity)) {
                throw new IllegalArgumentException("해당 반응은 이미 존재합니다.");
            }
        }else {
            if (reactionRepository.existsByPostAndMemberAndReactionCodeAndComment(postEntity, memberEntity, reactionCodeEntity, commentEntity)) {
                throw new IllegalArgumentException("해당 반응은 이미 존재합니다.");
            }
        }

        ReactionEntity reactionEntity = reactionRepository.findById(reactionId).orElseThrow(() -> new NoSuchElementException("해당 반응이 없습니다."));
        reactionEntity.setComment(commentEntity);
        reactionEntity.setMember(memberEntity);
        reactionEntity.setPost(postEntity);
        reactionEntity.setReactionCode(reactionCodeEntity);
        
        return BackOfficeReactionDto.fromEntity(reactionRepository.save(reactionEntity));
    }

    @Transactional
    public void deleteReaction(Long reactionId) {
        log.info("리액션 삭제 서비스");

        reactionRepository.deleteById(reactionId);
    }

    public List<ReactionCodeDto> getReactionCodes() {
        log.info("리액션 코드 조회 서비스");

        List<ReactionCodeEntity> reactionCodeEntities = reactionCodeRepository.findAll();
        return reactionCodeEntities.stream().map(ReactionCodeDto::fromEntity).toList();
    }

    @Transactional
    public ReactionCodeDto postReactionCode(BackOfficeReactionCodeRequestDto requestDto) throws IllegalArgumentException {
        log.info("리액션 코드 추가 서비스");

        if (reactionCodeRepository.findByCode(requestDto.getCode()).isPresent()) {
            throw new IllegalArgumentException("해당 코드는 이미 존재합니다.");
        }

        ReactionCodeEntity reactionCodeEntity = ReactionCodeEntity.builder()
        .code(requestDto.getCode())
        .name(requestDto.getName())
        .build();

        return ReactionCodeDto.fromEntity(reactionCodeRepository.save(reactionCodeEntity));
    }

    @Transactional
    public ReactionCodeDto putReactionCode(Long reactionCodeId, BackOfficeReactionCodeRequestDto requestDto) throws NoSuchElementException, IllegalArgumentException {
        log.info("리액션 코드 수정 서비스");

        ReactionCodeEntity reactionCodeEntity = reactionCodeRepository.findById(reactionCodeId).orElseThrow(() -> new NoSuchElementException("해당 반응 코드는 존재하지 않습니다."));

        if(reactionCodeEntity.getCode().equals(requestDto.getCode()) != reactionCodeRepository.existsByCode(requestDto.getCode())) throw new IllegalArgumentException("해당 코드는 이미 존재합니다.");

        reactionCodeEntity.setCode(requestDto.getCode());
        reactionCodeEntity.setName(requestDto.getName());

        return ReactionCodeDto.fromEntity(reactionCodeRepository.save(reactionCodeEntity));
    }

    @Transactional
    public void deleteReactionCode(Long reactionCodeId) {
        log.info("리액션 코드 삭제 서비스");

        reactionCodeRepository.deleteById(reactionCodeId);
    }

    public List<BackOfficeMemberDto> getMembers() {
        log.info("사용자 조회 서비스");

        List<MemberEntity> memberEntities = memberRepository.findAll();
        return memberEntities.stream().map(BackOfficeMemberDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficeMemberDto postMember(BackOfficeMemberRequestDto requestDto) throws IllegalArgumentException, NoSuchElementException {
        log.info("사용자 추가 서비스");

        // 멤버 엔티티에 이메일이 존재
        if (memberRepository.existsByEmail(requestDto.getEmail())) {
            // 소셜 계정 엔티티에 Provider가 local이 있는지 확인 후 없으면 생성
            MemberEntity memberEntity = memberRepository.findByEmail(requestDto.getEmail()).orElseThrow(() -> new NoSuchElementException("해당 이메일의 사용자가 없습니다."));

            // Local 계정 있으면 에러 처리
            if (socialAccountRepository.existsByProviderAndProviderId("LOCAL", memberEntity.getId())) {
                throw new IllegalArgumentException("해당 이메일은 로컬 계정이 있습니다.");
            }

            socialAccountRepository.findByProviderAndProviderId("LOCAL", memberEntity.getId())
                .orElseGet(
                    () -> {
                        SocialAccountEntity newSocialAccountEntity = SocialAccountEntity.builder()
                            .member(memberEntity)
                            .provider("LOCAL")
                            .providerId(memberEntity.getId())
                            .build()
                        ;
                        
                        return socialAccountRepository.save(newSocialAccountEntity);
                    }
                );
            
            memberEntity.setUsername(requestDto.getUsername());
            memberEntity.setPassword(passwordEncoder.encode(requestDto.getPassword()));

            return BackOfficeMemberDto.fromEntity(memberRepository.save(memberEntity));

        // 없으면 계정 생성
        }else {
            MemberEntity memberEntity = MemberEntity.builder()
                .email(requestDto.getEmail())
                .username(requestDto.getUsername())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .build()
            ;

            MemberEntity savedMemberEntity = memberRepository.save(memberEntity);

            MemberRoleCodeEntity memberRoleCodeUserEntity = memberRoleCodeRepository.findByCode("ROLE_USER").orElseThrow(() -> new NoSuchElementException("유저 권한이 없습니다."));
            MemberRoleEntity memberRoleEntity = MemberRoleEntity.builder()
                .member(savedMemberEntity)
                .memberRoleCode(memberRoleCodeUserEntity)
                .build()
            ;

            memberRoleRepository.save(memberRoleEntity);

            SocialAccountEntity socialAccountEntity = SocialAccountEntity.builder()
                .member(savedMemberEntity)
                .provider("LOCAL")
                .providerId(savedMemberEntity.getId())
                .build()
            ;

            socialAccountRepository.save(socialAccountEntity);

            return BackOfficeMemberDto.fromEntity(socialAccountEntity.getMember());
        }
    }

    @Transactional
    public BackOfficeMemberDto putMember(Long memberRoleId, BackOfficeMemberRequestDto requestDto) throws NoSuchElementException, IllegalArgumentException {
        log.info("사용자 수정 서비스");

        // 유저와 비밀번호 확인
        MemberEntity memberEntity = memberRepository.findByEmailAndSocialAccountsProvider(requestDto.getEmail(), "LOCAL").orElseThrow();

        memberEntity.setUsername(requestDto.getUsername());
        memberEntity.setPassword(passwordEncoder.encode(requestDto.getPassword()));

        return BackOfficeMemberDto.fromEntity(memberRepository.save(memberEntity));
    }

    @Transactional
    public void deleteMember(Long memberId) {
        log.info("사용자 삭제 서비스");

        memberRepository.deleteById(memberId);
    }

    public List<BackOfficeMemberRoleDto> getMemberRoles() {
        log.info("사용자 권한 조회 서비스");

        List<MemberRoleEntity> memberRoleEntities = memberRoleRepository.findAll();
        return memberRoleEntities.stream().map(BackOfficeMemberRoleDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficeMemberRoleDto postMemberRole(BackOfficeMemberRoleRequestDto requestDto) throws IllegalArgumentException, NoSuchElementException {
        log.info("사용자 권한 추가 서비스");

        MemberEntity memberEntity = memberRepository.findById(requestDto.getMemberId()).orElseThrow(() -> new NoSuchElementException("해당 사용자는 없습니다"));
        MemberRoleCodeEntity memberRoleCodeEntity = memberRoleCodeRepository.findById(requestDto.getMemberRoleCodeId()).orElseThrow(() -> new NoSuchElementException("해당 사용자 권한 코드는 없습니다"));

        if (memberRoleRepository.existsByMemberAndMemberRoleCode(memberEntity, memberRoleCodeEntity)) throw new IllegalArgumentException("해당 사용자 권한은 존재합니다.");

        MemberRoleEntity memberRoleEntity = MemberRoleEntity.builder()
        .member(memberEntity)
        .memberRoleCode(memberRoleCodeEntity)
        .build();

        return BackOfficeMemberRoleDto.fromEntity(memberRoleRepository.save(memberRoleEntity));
    }

    @Transactional
    public BackOfficeMemberRoleDto putMemberRole(Long memberRoleId, BackOfficeMemberRoleRequestDto requestDto) throws NoSuchElementException, IllegalArgumentException {
        log.info("사용자 권한 수정 서비스");

        MemberEntity memberEntity = memberRepository.findById(requestDto.getMemberId()).orElseThrow(() -> new NoSuchElementException("해당 사용자는 없습니다"));
        MemberRoleCodeEntity memberRoleCodeEntity = memberRoleCodeRepository.findById(requestDto.getMemberRoleCodeId()).orElseThrow(() -> new NoSuchElementException("해당 사용자 권한 코드는 없습니다"));

        if (memberRoleRepository.existsByMemberAndMemberRoleCode(memberEntity, memberRoleCodeEntity)) throw new IllegalArgumentException("해당 사용자 권한은 존재합니다.");

        MemberRoleEntity memberRoleEntity = memberRoleRepository.findById(memberRoleId).orElseThrow(() -> new NoSuchElementException("해당 사용자 권한은 없습니다."));
        memberRoleEntity.setMember(memberEntity);
        memberRoleEntity.setMemberRoleCode(memberRoleCodeEntity);

        return BackOfficeMemberRoleDto.fromEntity(memberRoleRepository.save(memberRoleEntity));
    }

    @Transactional
    public void deleteMemberRole(Long memberRoleId) {
        log.info("사용자 권한 삭제 서비스");

        memberRoleRepository.deleteById(memberRoleId);
    }

    public List<BackOfficeMemberRoleCodeDto> getMemberRoleCodes() {
        log.info("사용자 권한 코드 조회 서비스");

        List<MemberRoleCodeEntity> memberRoleCodeEntities = memberRoleCodeRepository.findAll();
        return memberRoleCodeEntities.stream().map(BackOfficeMemberRoleCodeDto::fromEntity).toList();
    }

    @Transactional
    public BackOfficeMemberRoleCodeDto postMemberRoleCode(BackOfficeMemberRoleCodeRequestDto requestDto) throws IllegalArgumentException {
        log.info("사용자 권한 코드 추가 서비스");

        if (memberRoleCodeRepository.existsByCode(requestDto.getCode())) throw new IllegalArgumentException("해당 코드는 이미 존재합니다.");

        MemberRoleCodeEntity memberRoleCodeEntity = MemberRoleCodeEntity.builder()
        .code(requestDto.getCode())
        .name(requestDto.getName())
        .build();

        return BackOfficeMemberRoleCodeDto.fromEntity(memberRoleCodeRepository.save(memberRoleCodeEntity));
    }

    @Transactional
    public BackOfficeMemberRoleCodeDto putMemberRoleCode(Long memberRoleCodeId, BackOfficeMemberRoleCodeRequestDto requestDto) throws NoSuchElementException, IllegalArgumentException {
        log.info("사용자 권한 코드 수정 서비스");

        MemberRoleCodeEntity memberRoleCodeEntity = memberRoleCodeRepository.findById(memberRoleCodeId).orElseThrow(() -> new NoSuchElementException("해당 사용자 권한 코드가 없습니다."));

        if(memberRoleCodeEntity.getCode().equals(requestDto.getCode()) != memberRoleCodeRepository.existsByCode(requestDto.getCode())) throw new IllegalArgumentException("해당 코드는 이미 존재합니다.");

        memberRoleCodeEntity.setCode(requestDto.getCode());
        memberRoleCodeEntity.setName(requestDto.getName());

        return BackOfficeMemberRoleCodeDto.fromEntity(memberRoleCodeRepository.save(memberRoleCodeEntity));
    }

    @Transactional
    public void deleteMemberRoleCode(Long memberRoleCodeId) {
        log.info("사용자 권한 코드 삭제 서비스");

        memberRoleCodeRepository.deleteById(memberRoleCodeId);
    }
}   
