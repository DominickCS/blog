package com.dominickcs.blog.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.Repository;

import com.dominickcs.blog.entity.BlogPost;

public interface BlogPostRepository extends Repository<BlogPost, UUID> {
  BlogPost save(BlogPost blogPost);

  List<BlogPost> findAll();
}
