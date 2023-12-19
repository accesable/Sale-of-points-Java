package org.nhutanh.pointofsale.config;

import org.nhutanh.pointofsale.controllers.AuthController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    Logger logger
            = LoggerFactory.getLogger(WebConfig.class);
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path dynamicDir = Paths.get("src/dynamic");
        String dynamicPath = dynamicDir.toFile().getAbsolutePath();

        logger.info(dynamicPath);
        registry.addResourceHandler("/dynamic/**")
                .addResourceLocations("file:" + dynamicPath + "/");
    }
}
