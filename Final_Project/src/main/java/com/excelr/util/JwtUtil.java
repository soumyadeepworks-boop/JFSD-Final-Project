package com.excelr.util;
import java.util.Date;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
@Component
public class JwtUtil {
	private final String SECRET_KEY = "mySecretKeyForFinalProject123456789";
	public String generateToken(String email) {	
	    return Jwts.builder()
	            .subject(email)
	            .issuedAt(new Date())
	            .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
	            .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
	            .compact();
	}public String extractEmail(String token) {
	    return Jwts.parser()
	            .verifyWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
	            .build()
	            .parseSignedClaims(token)
	            .getPayload()
	            .getSubject();
	}
}
