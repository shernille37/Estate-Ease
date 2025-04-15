package com.shernillelicud.propertyapp.request.auth;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotNull(message = "Username is required!")
    private String username;

    @NotNull(message = "Email is required!")
    private String email;

    @NotNull(message = "Password is required!")
    private String password;
}
