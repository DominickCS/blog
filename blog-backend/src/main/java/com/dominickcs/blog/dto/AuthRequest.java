package com.dominickcs.blog.dto;

import lombok.Data;

@Data
public class AuthRequest {
  private String username;
  private String password;
  private String email;
  private String role;
}
