package com.shernillelicud.propertyapp.service.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class JwtService {

    private static final String SECRET_KEY = "355b6fda9af6c2bcf04085ef36f9e02d20839008c6374a059107fd8063d27796";

    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSignInKey()).build().parseSignedClaims(token).getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = SECRET_KEY.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }


    public String generateToken(UserDetails userDetails) {
// 1 Hour expiration
        return generateToken(new HashMap<>(), userDetails, 1000 * 60 * 60);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails, long expireInterval) {
        return Jwts
                .builder()
                .claims().add(extraClaims)
                .and()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expireInterval))
                .signWith(getSignInKey())
                .compact();
    }

    public String extractEmail(String token) {
        final Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    public boolean isTokenExpired(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getExpiration().before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


}

