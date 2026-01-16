package com.dominickcs.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dominickcs.blog.dto.AuthRequest;
import com.dominickcs.blog.dto.AuthResponse;
import com.dominickcs.blog.entity.User;
import com.dominickcs.blog.security.JwtUtil;
import com.dominickcs.blog.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequest request) {
    UsernamePasswordAuthenticationToken authInput = new UsernamePasswordAuthenticationToken(request.getUsername(),
        request.getPassword());

    authenticationManager.authenticate(authInput);

    String token = jwtUtil.generateToken(request.getUsername());

    return ResponseEntity.ok(new AuthResponse(token));
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody AuthRequest request) {
    if (userService.existsByUsername(request.getUsername())) {
      return ResponseEntity.badRequest().body("Username already exists");
    }

    User newUser = new User();
    newUser.setUsername(request.getUsername());
    newUser.setPassword(passwordEncoder.encode(request.getPassword()));
    if (request.getRole() == null) {
      newUser.setRole("ROLE_USER");
    } else {
      newUser.setRole(request.getRole());
    }

    userService.save(newUser);
    String token = jwtUtil.generateToken(request.getUsername());
    return ResponseEntity.ok(new AuthResponse(token));

  }
}
