package com.dominickcs.blog.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dominickcs.blog.entity.BlogCommentReply;

public interface BlogPostCommentReplyRepository extends JpaRepository<BlogCommentReply, UUID> {

  List<BlogCommentReply> findAll();

  Optional<BlogCommentReply> findById(UUID id);
}
