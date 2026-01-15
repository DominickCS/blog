package com.dominickcs.blog.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dominickcs.blog.entity.BlogPost;

public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {
  List<BlogPost> findAll();

  Optional<BlogPost> findById(UUID id);

  List<BlogPost> findByOrderByBlogPublishDateDesc();
}
