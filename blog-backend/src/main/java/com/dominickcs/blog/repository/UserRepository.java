package com.dominickcs.blog.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dominickcs.blog.entity.User;

public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByUsername(String username);

  boolean existsByUsername(String username);

  @Modifying
  @Query(value = "DELETE FROM user_saved_posts WHERE blog_post_id = :id", nativeQuery = true)
  void removeSavedPostFromAllUsers(@Param("id") UUID id);

  @Modifying
  @Query(value = "DELETE FROM user_liked_posts WHERE blog_post_id = :id", nativeQuery = true)
  void removeLikedPostFromAllUsers(@Param("id") UUID id);
}
