package com.shernillelicud.propertyapp.controllers;


import com.shernillelicud.propertyapp.dto.AuthDto;
import static org.springframework.http.HttpStatus.*;

import com.shernillelicud.propertyapp.models.User;
import com.shernillelicud.propertyapp.request.auth.AuthRequest;
import com.shernillelicud.propertyapp.request.auth.RegisterRequest;
import com.shernillelicud.propertyapp.response.ApiResponse;
import com.shernillelicud.propertyapp.service.auth.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = authenticationService.register(request);
        AuthDto authDto = authenticationService.convertToDto(user);
        return ResponseEntity.status(OK).body(new ApiResponse("success", authDto));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> authenticate(@Valid @RequestBody AuthRequest request) {
        User user = authenticationService.login(request);
        AuthDto authDto = authenticationService.convertToDto(user);
        return ResponseEntity.status(OK).body(new ApiResponse("success", authDto));
    }


}
