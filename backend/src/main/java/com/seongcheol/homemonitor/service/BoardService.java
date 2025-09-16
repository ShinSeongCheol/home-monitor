package com.seongcheol.homemonitor.service;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.domain.BoardRoleCodeEntity;
import com.seongcheol.homemonitor.domain.CommentEntity;
import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.PostEntity;
import com.seongcheol.homemonitor.dto.UserDetailsImpl;
import com.seongcheol.homemonitor.dto.request.CommentRequestDto;
import com.seongcheol.homemonitor.dto.request.PostRequestDto;
import com.seongcheol.homemonitor.dto.response.BoardResponseDto;
import com.seongcheol.homemonitor.dto.response.CommentResponseDto;
import com.seongcheol.homemonitor.dto.response.ImageResponseDto;
import com.seongcheol.homemonitor.dto.response.PostResponseDto;
import com.seongcheol.homemonitor.repository.BoardRepository;
import com.seongcheol.homemonitor.repository.BoardRoleCodeRepository;
import com.seongcheol.homemonitor.repository.CommentRepository;
import com.seongcheol.homemonitor.repository.MemberRepository;
import com.seongcheol.homemonitor.repository.PostRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardService {
    
    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private BoardRoleCodeRepository boardRoleCodeRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Value("${host}")
    private String HOST;

    @Value("${image.upload_dir}")
    private String IMAGE_UPLOAD_DIR;

    @Value("${image.url_prefix}")
    private String IMAGE_URL_PREFIX;

    @Transactional
    public void initBoardRoleCode() {
        log.info("게시판 역할 코드 초기화 서비스");

        log.info("게시판 읽기 권한 초기화");
        boardRoleCodeRepository.findByCode("READ").orElseGet(() -> {
            BoardRoleCodeEntity boardRoleCodeEntity = BoardRoleCodeEntity.builder()
                .code("READ")
                .name("읽기")
                .build()
            ;
            return boardRoleCodeRepository.save(boardRoleCodeEntity);
        });

        log.info("게시판 쓰기 권한 초기화");
        boardRoleCodeRepository.findByCode("WRITE").orElseGet(() -> {
            BoardRoleCodeEntity boardRoleCodeEntity = BoardRoleCodeEntity.builder()
                .code("WRITE")
                .name("쓰기")
                .build()
            ;
            return boardRoleCodeRepository.save(boardRoleCodeEntity);
        });

        log.info("게시판 수정 권한 초기화");
        boardRoleCodeRepository.findByCode("MODIFY").orElseGet(() -> {
            BoardRoleCodeEntity boardRoleCodeEntity = BoardRoleCodeEntity.builder()
                .code("MODIFY")
                .name("수정")
                .build()
            ;
            return boardRoleCodeRepository.save(boardRoleCodeEntity);
        });

        log.info("게시판 삭제 권한 초기화");
        boardRoleCodeRepository.findByCode("DELETE").orElseGet(() -> {
            BoardRoleCodeEntity boardRoleCodeEntity = BoardRoleCodeEntity.builder()
                .code("DELETE")
                .name("삭제")
                .build()
            ;
            return boardRoleCodeRepository.save(boardRoleCodeEntity);
        });
    }

    public List<BoardResponseDto> getBoards() {
        log.debug("게시판 종류 조회 서비스");
        List<BoardEntity> BoardEntities = boardRepository.findAll();
        List<BoardResponseDto> boardResponseDtos = BoardEntities.stream().map(boardEntity -> BoardResponseDto.fromEntity(boardEntity)).toList();
        return boardResponseDtos;
    }

    public BoardResponseDto getBoard(String categoryCode) {
        log.debug("게시판 데이터 조회 서비스");
        BoardEntity boardEntity = boardRepository.findByCategoryCode(categoryCode);
        BoardResponseDto boardResponseDto = BoardResponseDto.fromEntity(boardEntity);
        return boardResponseDto;
    }

    @Transactional
    public PostResponseDto postBoard(String categoryCode, PostRequestDto postRequestDto) throws IllegalArgumentException{
        log.debug("게시판 {} 글쓰기 {}", categoryCode, postRequestDto.toString());

        LocalDateTime currentDateTime = LocalDateTime.now();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        PostEntity.PostEntityBuilder postEntityBuilder = PostEntity.builder()
            .title(postRequestDto.getTitle())
            .content(postRequestDto.getContent())
            .view(0)
            .createdAt(currentDateTime)
            .updatedAt(currentDateTime)
        ;

        // board Entity 연관 관계 설정
        BoardEntity boardEntity = boardRepository.findByCategoryCode(categoryCode);
        postEntityBuilder.board(boardEntity);

        // member entity 연관 관계 설정
        if (authentication != null && authentication.isAuthenticated()) {

            if (authentication.getPrincipal() instanceof UserDetailsImpl) {
                UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
                String userEmail = userDetailsImpl.getEmail();

                MemberEntity memberEntity = memberRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("해당 이메일의 사용자가 존재하지 않습니다."));
                postEntityBuilder.member(memberEntity);
            }

        }

        PostEntity postEntity = postEntityBuilder.build();

        PostEntity savedPostEntity = postRepository.save(postEntity);

        return PostResponseDto.fromEntity(savedPostEntity);
    }

    @Transactional
    public PostResponseDto getPost(String categoryCode, Long postId) {
        log.info("게시글 {} 글 {} 조회 서비스", categoryCode, postId);

        PostEntity postEntity = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
        postEntity.setView(postEntity.getView() + 1);

        PostResponseDto postResponseDto = PostResponseDto.fromEntity(postEntity);

        return postResponseDto;
    }

    @Transactional
    public PostResponseDto putPost(String categoryCode, Long postId, PostRequestDto postRequestDto) throws IllegalArgumentException, AccessDeniedException{
        log.debug("게시판 {} 글 수정 {}", categoryCode, postRequestDto.toString());
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // member entity 연관 관계 설정
        if (authentication != null && authentication.isAuthenticated()) {
            
            if (authentication.getPrincipal() instanceof UserDetailsImpl) {
                UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
                String userEmail = userDetailsImpl.getEmail();
                
                MemberEntity memberEntity = memberRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("해당 이메일의 사용자가 존재하지 않습니다."));
                
                PostEntity postEntity = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
                if (!memberEntity.getEmail().equals(postEntity.getMember().getEmail())) throw new AccessDeniedException("작성자가 아니므로 수정할 수 없습니다.");

                LocalDateTime currentDateTime = LocalDateTime.now();
                postEntity.setTitle(postRequestDto.getTitle());
                postEntity.setContent(postRequestDto.getContent());
                postEntity.setUpdatedAt(currentDateTime);

                return PostResponseDto.fromEntity(postEntity);
            }
            
        }

        throw new AccessDeniedException("인증되지 않은 사용자입니다.");
    }

    @Transactional
    public void deletePost(String categoryCode, Long postId) {
        log.debug("게시판 글 삭제 서비스");
        postRepository.deleteById(postId);
    }

    public ImageResponseDto uploadImage(MultipartFile file) throws IOException, MultipartException {
        log.debug("이미지 파일 저장 서비스");

        if(file.isEmpty()) {
            throw new MultipartException("file is empty");
        }

        Path rootLocation = Paths.get(IMAGE_UPLOAD_DIR);

        if(!Files.exists(rootLocation)){
            Files.createDirectories(rootLocation);
        }

        String originalFileName = file.getOriginalFilename();

        String filename = UUID.randomUUID() + "_" + originalFileName;
        Path destination = rootLocation.resolve(filename);

        file.transferTo(destination);

        String url = HOST + IMAGE_URL_PREFIX + filename;

        ImageResponseDto imageResponseDto = ImageResponseDto.builder().url(url).build();
        return imageResponseDto;
    }

    @Transactional
    public List<CommentResponseDto> getComments(String categoryCode, Long postId) {
        log.info("게시글 {} 글 {} 댓글 조회 서비스", categoryCode, postId);

        PostEntity postEntity = postRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("해당 게시글이 없습니다."));

        List<CommentEntity> commentEntity = commentRepository.findCommentsWithoutParent(postEntity);

        return commentEntity.stream().map((comment) -> CommentResponseDto.fromEntity(comment)).collect(Collectors.toList());
    }

    @Transactional
    public CommentResponseDto postComment(String categoryCode, Long postId, CommentRequestDto commentRequestDto) throws AccessDeniedException, NoSuchElementException, IllegalArgumentException {
        log.info("게시판 {} 게시글 {} 댓글 추가 서비스", categoryCode, postId);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // member entity 연관 관계 설정
        if (authentication != null && authentication.isAuthenticated()) {
            
            if (authentication.getPrincipal() instanceof UserDetailsImpl) {
                UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
                String userEmail = userDetailsImpl.getEmail();
                
                MemberEntity memberEntity = memberRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("해당 이메일의 사용자가 존재하지 않습니다."));
                PostEntity postEntity = postRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("해당하는 게시글이 없습니다."));

                LocalDateTime localDateTime = LocalDateTime.now();

                CommentEntity commentEntity = CommentEntity.builder()
                    .content(commentRequestDto.getComment())
                    .createdAt(localDateTime)
                    .updatedAt(localDateTime)
                    .post(postEntity)
                    .member(memberEntity)
                    .build()
                ;

                CommentEntity savedCommentResponseEntity = commentRepository.save(commentEntity);

                return CommentResponseDto.fromEntity(savedCommentResponseEntity);
            }
            
        }

        throw new AccessDeniedException("인증되지 않은 사용자입니다.");
    }

    @Transactional
    public CommentResponseDto putComment(String categoryCode, Long postId, Long commentId, CommentRequestDto commentRequestDto) throws AccessDeniedException, NoSuchElementException, IllegalArgumentException {
        log.info("게시판 {} 게시글 {} 댓글 {} 수정 서비스", categoryCode, postId, commentId);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // member entity 연관 관계 설정
        if (authentication != null && authentication.isAuthenticated()) {
            
            if (authentication.getPrincipal() instanceof UserDetailsImpl) {
                UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
                String userEmail = userDetailsImpl.getEmail();
                
                MemberEntity memberEntity = memberRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("해당 이메일의 사용자가 존재하지 않습니다."));
                CommentEntity commentEntity = commentRepository.findById(commentId).orElseThrow(() -> new NoSuchElementException("해당하는 댓글이 없습니다."));

                if (!memberEntity.getEmail().equals(commentEntity.getMember().getEmail())) throw new AccessDeniedException("작성자가 아니므로 수정할 수 없습니다.");

                LocalDateTime localDateTime = LocalDateTime.now();

                commentEntity.setContent(commentRequestDto.getComment());
                commentEntity.setUpdatedAt(localDateTime);

                return CommentResponseDto.fromEntity(commentEntity);
            }
            
        }

        throw new AccessDeniedException("인증되지 않은 사용자입니다.");
    }

    @Transactional
    public void deleteComment(String categoryCode, Long postId, Long commentId) throws AccessDeniedException, NoSuchElementException, IllegalArgumentException {
        log.info("게시판 {} 게시글 {} 댓글 {} 삭제 서비스", categoryCode, postId, commentId);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // member entity 연관 관계 설정
        if (authentication != null && authentication.isAuthenticated()) {
            
            if (authentication.getPrincipal() instanceof UserDetailsImpl) {
                UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
                String userEmail = userDetailsImpl.getEmail();
                
                MemberEntity memberEntity = memberRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("해당 이메일의 사용자가 존재하지 않습니다."));
                CommentEntity commentEntity = commentRepository.findById(commentId).orElseThrow(() -> new NoSuchElementException("해당하는 댓글이 없습니다."));

                if (!memberEntity.getEmail().equals(commentEntity.getMember().getEmail())) throw new AccessDeniedException("작성자가 아니므로 삭제할 수 없습니다.");

                commentRepository.deleteById(commentId);
                return;
            }
            
        }
        throw new AccessDeniedException("인증되지 않은 사용자입니다.");
    }

    @Transactional
    public CommentResponseDto replyComment(String categoryCode, Long postId, Long commentId, CommentRequestDto commentRequestDto) throws AccessDeniedException, NoSuchElementException, IllegalArgumentException {
        log.info("게시판 {} 게시글 {} 댓글 {} 댓글 달기 서비스", categoryCode, postId, commentId);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // member entity 연관 관계 설정
        if (authentication != null && authentication.isAuthenticated()) {
            
            if (authentication.getPrincipal() instanceof UserDetailsImpl) {
                UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
                String userEmail = userDetailsImpl.getEmail();
                
                MemberEntity memberEntity = memberRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("해당 이메일의 사용자가 존재하지 않습니다."));
                PostEntity postEntity = postRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("해당하는 게시글이 없습니다."));

                LocalDateTime localDateTime = LocalDateTime.now();

                CommentEntity parentCommentEntity = commentRepository.findById(commentId).orElseThrow(() -> new NoSuchElementException("해당하는 댓글이 없습니다."));

                CommentEntity commentEntity = CommentEntity.builder()
                    .content(commentRequestDto.getComment())
                    .createdAt(localDateTime)
                    .updatedAt(localDateTime)
                    .post(postEntity)
                    .member(memberEntity)
                    .parentComment(parentCommentEntity)
                    .build()
                ;

                CommentEntity savedCommentResponseEntity = commentRepository.save(commentEntity);

                return CommentResponseDto.fromEntity(savedCommentResponseEntity);
            }
            
        }

        throw new AccessDeniedException("인증되지 않은 사용자입니다.");
    }
}
