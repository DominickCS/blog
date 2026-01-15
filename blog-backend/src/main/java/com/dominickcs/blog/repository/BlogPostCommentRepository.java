package com.dominickcs.blog.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dominickcs.blog.entity.BlogComment;

public interface BlogPostCommentRepository extends JpaRepository<BlogComment, UUID> {

  List<BlogComment> findAll();

  Optional<BlogComment> findById(UUID id);
}
