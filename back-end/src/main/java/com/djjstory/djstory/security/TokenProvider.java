package com.djjstory.djstory.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.djjstory.djstory.model.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TokenProvider {

	private static final String SECRET_KEY = "temPORARySECRETKEy";
	
	public String create(UserEntity userEntity) {
		
		Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
		
		return Jwts.builder().signWith(SignatureAlgorithm.HS512, SECRET_KEY)
							 .setSubject(userEntity.getId())
							 .setIssuer("djstory app")
							 .setIssuedAt(new Date())
							 .setExpiration(expiryDate)
							 .compact();
	}
	
	public String validateAndGetUserId(String token) {
		Claims claims = Jwts.parser().setSigningKey(SECRET_KEY)
								     .parseClaimsJws(token)
								     .getBody();
		
		if(claims.getExpiration().before(new Date())) {
			log.info("expired token");
			return null;
		}
		
		return claims.getSubject();
	}
	
}
