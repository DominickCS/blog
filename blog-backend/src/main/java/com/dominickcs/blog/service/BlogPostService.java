package com.dominickcs.blog.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.dominickcs.blog.dto.BlogPostDTO;
import com.dominickcs.blog.entity.BlogPost;
import com.dominickcs.blog.repository.BlogPostRepository;

@Service
public class BlogPostService {
  @Autowired
  private BlogPostRepository blogPostRepository;

  public BlogPostService() {
  };

  public String addNewBlogPost(@RequestBody BlogPostDTO blogPostDTO) {
    LocalDateTime currentDate = LocalDateTime.now();
    BlogPost blogPost = new BlogPost();
    blogPost.setId(blogPostDTO.getId());
    blogPost.setBlogTags(blogPostDTO.getBlogTags());
    blogPost.setBlogBody(blogPostDTO.getBlogBody());
    blogPost.setBlogComments(null);
    blogPost.setBlogHeaderURL(blogPostDTO.getBlogHeaderURL());
    blogPost.setBlogTitle(blogPostDTO.getBlogTitle());
    blogPost.setBlogPublishDate(currentDate);
    blogPostRepository.save(blogPost);
    return "New blog post added!\n" + blogPost.toString();
  }
}
