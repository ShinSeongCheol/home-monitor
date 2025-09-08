package com.seongcheol.homemonitor.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.seongcheol.homemonitor.domain.BoardEntity;
import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.domain.PostEntity;
import com.seongcheol.homemonitor.dto.UserDetailsImpl;
import com.seongcheol.homemonitor.dto.request.PostRequestDto;
import com.seongcheol.homemonitor.dto.response.BoardResponseDto;
import com.seongcheol.homemonitor.dto.response.PostResponseDto;
import com.seongcheol.homemonitor.repository.BoardRepository;
import com.seongcheol.homemonitor.repository.MemberRepository;
import com.seongcheol.homemonitor.repository.PostRepository;

import jakarta.transaction.Transactional;

@Service
public class BoardService {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    public List<BoardResponseDto> getBoards() {
        logger.debug("게시판 종류 조회 서비스");
        List<BoardEntity> BoardEntities = boardRepository.findAll();
        List<BoardResponseDto> boardResponseDtos = BoardEntities.stream().map(boardEntity -> BoardResponseDto.fromEntity(boardEntity)).toList();
        return boardResponseDtos;
    }

    public BoardResponseDto getBoard(String categoryCode) {
        logger.debug("게시판 데이터 조회 서비스");
        BoardEntity boardEntity = boardRepository.findByCategoryCode(categoryCode);
        BoardResponseDto boardResponseDto = BoardResponseDto.fromEntity(boardEntity);
        return boardResponseDto;
    }

    @Transactional
    public PostResponseDto postBoard(String categoryCode, PostRequestDto postRequestDto) throws IllegalArgumentException{
        logger.debug("게시판 {} 글쓰기 {}", categoryCode, postRequestDto.toString());

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

}
