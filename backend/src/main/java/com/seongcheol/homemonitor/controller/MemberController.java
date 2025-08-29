package com.seongcheol.homemonitor.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.dto.KaKaoAuthorizeDto;
import com.seongcheol.homemonitor.dto.MemberDto;
import com.seongcheol.homemonitor.service.KakaoService;
import com.seongcheol.homemonitor.service.MemberService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/v1/member")
public class MemberController {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MemberService memberService;

    @Autowired
    private KakaoService kakaoService;

    @PostMapping("/signup")
    public ResponseEntity<MemberDto> signUp(@RequestBody MemberDto memberDto) {
        MemberDto savedMemberDto = memberService.signup(memberDto);
        return ResponseEntity.ok(savedMemberDto);
    }

    @PutMapping("/{username}")
    public ResponseEntity<MemberDto> putMember(@PathVariable("username") String username, @RequestBody MemberDto memberDto) {
        MemberDto newMemberDto = memberService.putMember(memberDto);

        return ResponseEntity.ok(newMemberDto);
    }

    @PostMapping("/kakao")
    public ResponseEntity<String> kakaoAuth(@RequestBody KaKaoAuthorizeDto kaKaoAuthorizeDto) {
        kakaoService.loadOrCreateSocialAccount(kaKaoAuthorizeDto);

        return ResponseEntity.ok(kaKaoAuthorizeDto.toString());
    }

}
