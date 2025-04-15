package com.shernillelicud.propertyapp;

import com.shernillelicud.propertyapp.config.Env;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class PropertyApplication {

	public static void main(String[] args) {
		new Env().loadEnv();
		SpringApplication.run(PropertyApplication.class, args);
	}

	@GetMapping
	public String greet() {
		return "Hello World!";
	}

}
