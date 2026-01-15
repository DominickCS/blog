package com.dominickcs.blog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dominickcs.blog.dto.BlogPostDTO;
import com.dominickcs.blog.entity.BlogPost;
import com.dominickcs.blog.repository.BlogPostRepository;
import com.dominickcs.blog.service.BlogPostService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/")
@RestController
public class BlogPostController {
  @Autowired
  private BlogPostRepository blogPostRepository;

  @Autowired
  BlogPostService blogPostService;

  @PostMapping("/new-post")
  public String addNewBlogPost(@RequestBody BlogPostDTO blogPostDTO) {
    return blogPostService.addNewBlogPost(blogPostDTO);
  }

  @GetMapping("/all-posts")
  public List<BlogPost> getAllBlogPosts() {
    return blogPostRepository.findAll();
  }

}
