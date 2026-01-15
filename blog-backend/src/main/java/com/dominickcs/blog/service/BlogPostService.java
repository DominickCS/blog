package com.dominickcs.blog.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.dominickcs.blog.dto.BlogPostCommentDTO;
import com.dominickcs.blog.dto.BlogPostDTO;
import com.dominickcs.blog.entity.BlogComment;
import com.dominickcs.blog.entity.BlogPost;
import com.dominickcs.blog.repository.BlogPostCommentRepository;
import com.dominickcs.blog.repository.BlogPostRepository;

@Service
public class BlogPostService {
  @Autowired
  private BlogPostRepository blogPostRepository;

  @Autowired
  private BlogPostCommentRepository blogPostCommentRepository;

  public BlogPostService() {
  };

  public String addBlogPost(@RequestBody BlogPostDTO blogPostDTO) throws Exception {
    try {
      BlogPost blogPost = new BlogPost();
      LocalDateTime currentDate = LocalDateTime.now();
      blogPost.setId(blogPostDTO.getId());
      blogPost.setBlogTags(blogPostDTO.getBlogTags());
      blogPost.setBlogBody(blogPostDTO.getBlogBody());
      blogPost.setBlogComments(null);
      blogPost.setBlogHeaderURL(blogPostDTO.getBlogHeaderURL());
      blogPost.setBlogTitle(blogPostDTO.getBlogTitle());
      blogPost.setBlogPublishDate(currentDate);
      blogPostRepository.save(blogPost);
      return ("Blog post creation successful! ");
    } catch (Exception e) {
      return ("An error occurred during blog post creation: " + e.toString());
    }
  }

  public String addComment(@RequestBody BlogPostCommentDTO blogPostCommentDTO) throws Exception {
    try {
      BlogComment blogComment = new BlogComment();
      LocalDateTime currentDate = LocalDateTime.now();
      BlogPost associatedBlogPost = blogPostRepository
          .findById(blogPostCommentDTO.getAssociatedBlogPostID())
          .orElseThrow(() -> new Exception("Blog post not found with ID: " +
              blogPostCommentDTO.getAssociatedBlogPostID()));
      blogComment.setAssociatedBlogPost(associatedBlogPost);
      blogComment.setCommentBody(blogPostCommentDTO.getCommentBody());
      blogComment.setCommentPublishDate(currentDate);
      blogPostCommentRepository.save(blogComment);
      return ("Comment successfully added to post with ID: " + associatedBlogPost.toString());
    } catch (Exception e) {
      return ("An error occurred during comment creation: " + e.toString());
    }
  }
}
