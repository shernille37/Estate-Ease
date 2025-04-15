package com.shernillelicud.propertyapp.request.message;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddMessageRequest {


    @NotNull(message = "Property is required")
    private String property;

    @NotNull(message = "Owner is required!")
    private String owner;

    @NotNull(message = "Name is required!")
    private String name;

    @NotNull(message = "Email is required!")
    private String email;

    @NotNull(message = "Phone is required!")
    private String phone;

    @NotNull(message = "Message is required!")
    private String message;

}
