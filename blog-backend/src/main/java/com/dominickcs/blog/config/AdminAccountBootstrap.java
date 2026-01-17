package com.dominickcs.blog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.dominickcs.blog.entity.User;
import com.dominickcs.blog.repository.UserRepository;

@Component
public class AdminAccountBootstrap implements CommandLineRunner {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Value("${admin.username}")
  private String adminUsername;

  @Value("${admin.password}")
  private String adminPassword;

  @Value("${admin.email}")
  private String adminEmail;

  @Override
  public void run(String... args) throws Exception {
    if (!userRepository.existsByUsername(adminUsername)) {
      User admin = new User();
      admin.setUsername(adminUsername);
      admin.setPassword(passwordEncoder.encode(adminPassword));
      admin.setEmail(adminEmail);
      admin.setRole("ROLE_ADMIN");
      admin.setEnabled(true);

      userRepository.save(admin);
      System.out.println("✓ Admin account created: " + adminUsername);
    } else {
      System.out.println("✓ Admin account already exists: " + adminUsername);
    }
  }
}
