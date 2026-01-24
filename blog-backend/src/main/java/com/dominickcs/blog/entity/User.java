package com.dominickcs.blog.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(unique = true, nullable = false)
  private String username;

  @JsonIgnore
  @Column(nullable = false)
  private String password;

  @Column(unique = true)
  private String email;

  @JsonIgnore
  @Column(nullable = false)
  private String role = "ROLE_USER";

  private boolean enabled = true;
  private boolean accountNonExpired = true;
  private boolean accountNonLocked = true;
  private boolean credentialsNonExpired = true;

  @ElementCollection
  @CollectionTable(name = "user_saved_posts", joinColumns = @JoinColumn(name = "user_id"))
  private List<SavedPost> savedPosts = new ArrayList<>();

  @ElementCollection
  @CollectionTable(name = "user_liked_posts", joinColumns = @JoinColumn(name = "user_id"))
  private List<LikedPost> likedPosts = new ArrayList<>();

  @ElementCollection
  @CollectionTable(name = "user_liked_comments", joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "comment_id")
  private List<UUID> likedComments = new ArrayList<>();

  @ElementCollection
  @CollectionTable(name = "user_liked_replies", joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "comment_id")
  private List<UUID> likedReplies = new ArrayList<>();

  // Method Overrides
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role));
  }

  @JsonIgnore
  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return accountNonExpired;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return accountNonLocked;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return credentialsNonExpired;
  }

  @JsonIgnore
  @Override
  public boolean isEnabled() {
    return enabled;
  }
}
