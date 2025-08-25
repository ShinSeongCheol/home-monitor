package com.seongcheol.homemonitor.components;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.seongcheol.homemonitor.service.ForecastService;

@Component
public class forecastScheduler {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ForecastService forecastService;
    
    @Scheduled(cron = "0 0 * * * *")
    public void getUltraForecastNowCast() {
        forecastService.getUltraForecastNowCast();
    }

}
