package com.dominickcs.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dominickcs.blog.entity.User;
import com.dominickcs.blog.repository.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public boolean existsByUsername(String username) {
    return userRepository.existsByUsername(username);
  }

  public User save(User user) {
    return userRepository.save(user);
  }

}
