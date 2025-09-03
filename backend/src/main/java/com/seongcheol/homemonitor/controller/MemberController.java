package com.seongcheol.homemonitor.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.MemberDto;
import com.seongcheol.homemonitor.dto.MemberRequestDto;
import com.seongcheol.homemonitor.service.MemberService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/v1/member")
public class MemberController {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<MemberDto> signUp(@RequestBody MemberRequestDto memberRequestDto) {
        logger.debug("유저 회원가입 컨트롤러 요청");

        MemberDto memberDto = memberService.signup(memberRequestDto);
        return ResponseEntity.ok(memberDto);
    }

    @PutMapping("/{username}")
    public ResponseEntity<MemberDto> putMember(@PathVariable("username") String username, @RequestBody MemberRequestDto memberRequestDto) {
        logger.debug("유저 정보 수정 컨트롤러 요청");

        MemberDto memberDto = memberService.putMember(memberRequestDto);

        return ResponseEntity.ok(memberDto);
    }

}
