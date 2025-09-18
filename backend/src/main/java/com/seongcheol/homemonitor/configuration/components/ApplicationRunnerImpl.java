package com.seongcheol.homemonitor.configuration.components;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.seongcheol.homemonitor.service.BoardService;
import com.seongcheol.homemonitor.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ApplicationRunnerImpl implements ApplicationRunner {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MemberService memberService;

    @Autowired
    private BoardService boardService;

    @Override
    public void run(ApplicationArguments args) {
        log.info("{} : {}", this.getClass().getSimpleName(), "초기화");

        log.info("Member Role Code 초기화");
        memberService.initMemberRoleCode();
        log.info("Board Role Code 초기화");
        boardService.initBoardRoleCode();
        log.info("Reaction Code 초기화");
        boardService.initReactionCode();

        try {
            memberService.initAdmin();    
        } catch (IllegalArgumentException e) {
            logger.error("ApplicationRunnerImpl Error", e);
        }
    }
    
}
