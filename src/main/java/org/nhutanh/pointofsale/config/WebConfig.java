package org.nhutanh.pointofsale.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path dynamicDir = Paths.get("src/dynamic");
        String dynamicPath = dynamicDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/dynamic/**")
                .addResourceLocations("file:" + dynamicPath + "/");
    }
}
