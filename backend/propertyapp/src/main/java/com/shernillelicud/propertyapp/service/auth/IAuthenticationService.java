package com.shernillelicud.propertyapp.service.auth;


import com.shernillelicud.propertyapp.dto.AuthDto;
import com.shernillelicud.propertyapp.models.User;
import com.shernillelicud.propertyapp.request.auth.AuthRequest;
import com.shernillelicud.propertyapp.request.auth.RegisterRequest;

public interface IAuthenticationService {

    User register(RegisterRequest request);
    User login(AuthRequest request);
    AuthDto convertToDto(User user);
}
