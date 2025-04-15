package com.shernillelicud.propertyapp.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shernillelicud.propertyapp.response.ApiResponse;
import com.shernillelicud.propertyapp.service.jwt.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;


    //    Filter to check the JWT Token
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String email;

        try {

//        Check JWT Token
        if(authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request,response);
            return;
        }

//        Extract the token
        jwt = authHeader.split(" ")[1];
        email = jwtService.extractEmail(jwt);

        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            If it's null then the user is not yet authenticated
//            GET the user from the database

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);

            if(jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

            request.setAttribute("email", email);
        }

        filterChain.doFilter(request, response);


        } catch (ExpiredJwtException e) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            ApiResponse apiResponse = new ApiResponse("Unauthorized: Expired Token", null);
            response.getWriter().write(objectMapper.writeValueAsString(apiResponse));

        } catch (MalformedJwtException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            ApiResponse apiResponse = new ApiResponse("No token", null);
            response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        }

    }
}

