package com.dominickcs.blog.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dominickcs.blog.dto.BlogPostCommentDTO;
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
  public String addNewBlogPost(@RequestBody BlogPostDTO blogPostDTO) throws Exception {
    return blogPostService.addBlogPost(blogPostDTO);
  }

  @PostMapping("/new-comment")
  public String addNewBlogComment(@RequestBody BlogPostCommentDTO blogPostCommentDTO) throws Exception {
    return blogPostService.addComment(blogPostCommentDTO);
  }

  @GetMapping("/all-posts")
  public List<BlogPost> getAllBlogPosts() {
    return blogPostRepository.findAll();
  }

  @PostMapping("/search")
  public List<BlogPost> findBlogPost(@RequestBody BlogPostDTO blogPostDTO) {
    String searchQuery = blogPostDTO.getSearchQuery();
    return blogPostRepository.findByOrderByBlogPublishDateDesc().stream()
        .filter(result -> result.getBlogTitle().toLowerCase().contains(searchQuery.toLowerCase()))
        .collect(Collectors.toList());
  }

}
