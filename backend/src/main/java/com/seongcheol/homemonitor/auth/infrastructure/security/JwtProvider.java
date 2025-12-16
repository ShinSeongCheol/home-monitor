package com.seongcheol.homemonitor.auth.infrastructure.security;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;

@Slf4j
@Component
public class JwtProvider {

    private final Key key;
    private final long accessTokenExpireTime;

    public JwtProvider(@Value("${JWT_SECRET}") final String secret, @Value("${jwt.expire_time}") final long accessTokenExpireTime) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenExpireTime = accessTokenExpireTime;
    }

    public String createAccessToken(String email, String username) {
        return createToken(email, username, accessTokenExpireTime);
    }

    private String createToken(String email, String username, long expireTime) {
        Claims clamis = Jwts.claims();
        clamis.put("email", email);
        clamis.put("name", username);

        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime expired = now.plusSeconds(expireTime);

        return Jwts.builder()
                .setClaims(clamis)
                .setIssuedAt(Date.from(now.toInstant()))
                .setExpiration(Date.from(expired.toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact()
                ;
    }

    public String getUserEmail(String token) {
        return parseClaims(token).get("email", String.class);
    }

    public boolean isValidToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("Invalid Jwt", e);
        } catch (ExpiredJwtException e) {
            log.error("Expired Jwt", e);
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported Jwt", e);
        } catch (IllegalArgumentException e) {
            log.error("IllegalArgument Jwt", e);
        }
        return false;
    }

    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody()
                    ;
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
