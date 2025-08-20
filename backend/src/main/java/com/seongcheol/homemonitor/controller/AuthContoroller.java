package com.seongcheol.homemonitor.controller;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongcheol.homemonitor.domain.MemberEntity;
import com.seongcheol.homemonitor.dto.LoginDto;
import com.seongcheol.homemonitor.dto.SignUpDto;
import com.seongcheol.homemonitor.repository.MemberRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthContoroller {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MemberRepository memberRepository;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        try {
            logger.info(loginDto.getName());
            logger.info(loginDto.getPassword());

            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDto.getName(), loginDto.getPassword());

            logger.info("Authenticating user: {}", loginDto.getName());
            Authentication authentication = authenticationManager.authenticate(token);

    
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok("Login");
        }catch (AuthenticationException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout");
    }
    
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpDto signUpDto) {
        if (memberRepository.existsByName(signUpDto.getName())) {
            return ResponseEntity.badRequest().body("Username is already exist");
        }

        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");

        MemberEntity memberEntity = MemberEntity.builder()
            .name(signUpDto.getName())
            .password(passwordEncoder.encode(signUpDto.getPassword()))
            .role(roles)
            .build();

        memberRepository.save(memberEntity);
        return ResponseEntity.ok("Sign up");
    }

}
