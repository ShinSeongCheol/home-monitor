package com.seongcheol.filter;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.seongcheol.homemonitor.components.JwtUtilComponent;
import com.seongcheol.homemonitor.dto.UserDetailsImpl;
import com.seongcheol.homemonitor.service.UserDetailServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserDetailServiceImpl userDetailServiceImpl;

    private final JwtUtilComponent jwtUtilComponent;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        
        String authorizationHeader = request.getHeader("Authorization");

        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            
            if(jwtUtilComponent.isValidToken(token)) {
                String email = jwtUtilComponent.getMemberEmail(token);
                
                UserDetails userDetails  = (UserDetailsImpl) userDetailServiceImpl.loadUserByUsername(email.toString());
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

            }
        }

        filterChain.doFilter(request, response);
    }
}
