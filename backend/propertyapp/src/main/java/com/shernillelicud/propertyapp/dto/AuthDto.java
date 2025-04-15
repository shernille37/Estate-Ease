package com.shernillelicud.propertyapp.dto;

import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;

@Data
public class AuthDto  {

    private String username;
    private String token;
    private String email;
}
