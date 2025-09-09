package com.seongcheol.homemonitor.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${image.upload_dir}")
    private String IMAGE_UPLOAD_DIR;

    @Value("${image.url_prefix}")
    private String IMAGE_URL_PREFIX;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(IMAGE_URL_PREFIX + "**").addResourceLocations("file:" + IMAGE_UPLOAD_DIR);
    }
    
}
