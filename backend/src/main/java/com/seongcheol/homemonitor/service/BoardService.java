package com.seongcheol.homemonitor.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.PostEntity;
import com.seongcheol.homemonitor.dto.UserDetailsImpl;
import com.seongcheol.homemonitor.dto.request.PostRequestDto;
import com.seongcheol.homemonitor.dto.response.BoardResponseDto;
import com.seongcheol.homemonitor.dto.response.ImageResponseDto;
import com.seongcheol.homemonitor.dto.response.PostResponseDto;
import com.seongcheol.homemonitor.repository.BoardRepository;
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
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Value("${host}")
    private String HOST;

    @Value("${image.upload_dir}")
    private String IMAGE_UPLOAD_DIR;

    @Value("${image.url_prefix}")
    private String IMAGE_URL_PREFIX;

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

}
