package com.shernillelicud.propertyapp.exceptions;


import com.shernillelicud.propertyapp.response.ApiResponse;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;


import javax.naming.AuthenticationException;
import java.util.HashMap;

import java.util.Map;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PropertyNotFoundException.class)
    public ResponseEntity<ApiResponse> propertyNotFound(PropertyNotFoundException e) {
        return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
    }

    @ExceptionHandler(ObjectIdNotValidException.class)
    public ResponseEntity<ApiResponse> objectIdNotValid(ObjectIdNotValidException e) {
        return ResponseEntity.status(BAD_REQUEST).body(new ApiResponse(e.getMessage(), null));
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse> userNotFound(UserNotFoundException e) {
        return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
    }

    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<ApiResponse> messageNotFound(MessageNotFoundException e) {
        return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiResponse> resourceNotFound(NoResourceFoundException e) {
        return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
    }


    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ApiResponse> notFound(NoHandlerFoundException e) {
        return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Page Not Found!", null));
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException e) {

        Map<String, String> errors = new HashMap<>();

        e.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        return ResponseEntity.status(BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> generalError(Exception e) {
        return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("An unexpected error occurred!", null));
    }

}
