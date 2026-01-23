package com.dominickcs.blog.security;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
  
  @Autowired
  private JwtUtil jwtUtil;
  
  @Autowired
  private UserDetailsService userDetailsService;
  
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    String header = request.getHeader("Authorization");
    
    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);
      String username = jwtUtil.extractUsername(token);
      
      if (username != null && jwtUtil.isTokenValid(token)) {
        UserDetails user = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null,
            user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
        
        String newToken = jwtUtil.generateToken(username);
        response.setHeader("X-New-Token", newToken);
      }
    }
    
    chain.doFilter(request, response);
  }
}
