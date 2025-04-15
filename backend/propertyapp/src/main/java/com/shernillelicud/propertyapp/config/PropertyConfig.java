package com.shernillelicud.propertyapp.config;

import com.shernillelicud.propertyapp.models.Property;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PropertyConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
