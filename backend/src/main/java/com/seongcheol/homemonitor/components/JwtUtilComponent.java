package com.seongcheol.homemonitor.components;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.seongcheol.homemonitor.dto.MemberDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;

@Component
public class JwtUtilComponent {

    private final Key key;
    private final long accessTokenExpireTime;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public JwtUtilComponent(@Value("${JWT_SECRET}") final String secret, @Value("${jwt.expire_time}") final long accessTokenExpireTime) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenExpireTime = accessTokenExpireTime;
    }

    public String createAccessToken(MemberDto memberDto) {
        return createToken(memberDto, accessTokenExpireTime);
    }

    private String createToken(MemberDto memberDto, long expireTime) {
        Claims clamis = Jwts.claims();
        clamis.put("email", memberDto.getEmail());
        clamis.put("name", memberDto.getNickname());

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

    public String getMemberEmail(String token) {
        return parseClaims(token).get("email", String.class);
    }

    public boolean isValidToken(String token) {
        try{
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        }catch(SecurityException | MalformedJwtException e) {
            logger.error("Invalid Jwt", e);
        }catch(ExpiredJwtException e) {
            logger.error("Expired Jwt", e);
        }catch(UnsupportedJwtException e) {
            logger.error("Unsupported Jwt", e);
        }catch(IllegalArgumentException e) {
            logger.error("IllegalArgument Jwt", e);
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
        }catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
