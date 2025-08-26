package com.seongcheol.homemonitor.components;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.seongcheol.homemonitor.service.ForecastService;

@Component
@Profile("prod")
public class forecastScheduler {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ForecastService forecastService;
    
    @Scheduled(cron = "0 30 * * * *")
    public void getUltraForecastNowCast() {
        try {
            forecastService.getUltraForecastNowCast();
        } catch (Exception e) {
            logger.error("forecastScheduler failed", e);
        }
    }

}
