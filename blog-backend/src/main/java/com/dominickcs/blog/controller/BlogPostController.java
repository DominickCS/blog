package com.dominickcs.blog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dominickcs.blog.dto.BlogPostDTO;
import com.dominickcs.blog.entity.BlogPost;
import com.dominickcs.blog.repository.BlogPostRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/")
@RestController
public class BlogPostController {
  @Autowired
  private BlogPostRepository blogPostRepository;

  @PostMapping("/new-post")
  public String addNewBlogPost(@RequestBody BlogPostDTO blogPostDTO) {
    BlogPost blogPost = new BlogPost();
    blogPost.setId(blogPostDTO.getId());
    blogPost.setBlogTags(blogPostDTO.getBlogTags());
    blogPost.setBlogBody(blogPostDTO.getBlogBody());
    blogPost.setBlogComments(blogPostDTO.getBlogComments());
    blogPost.setBlogHeaderURL(blogPostDTO.getBlogHeaderURL());
    blogPost.setBlogTitle(blogPostDTO.getBlogTitle());
    blogPostRepository.save(blogPost);
    return "New blog post added!\n" + blogPost.toString();
  }

  @GetMapping("/all-posts")
  public List<BlogPost> getAllBlogPosts() {
    return blogPostRepository.findAll();
  }

}
