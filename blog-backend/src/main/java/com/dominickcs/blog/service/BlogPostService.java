package com.dominickcs.blog.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.dominickcs.blog.dto.BlogPostCommentDTO;
import com.dominickcs.blog.dto.BlogPostCommentReplyDTO;
import com.dominickcs.blog.dto.BlogPostDTO;
import com.dominickcs.blog.entity.BlogComment;
import com.dominickcs.blog.entity.BlogCommentReply;
import com.dominickcs.blog.entity.BlogPost;
import com.dominickcs.blog.entity.User;
import com.dominickcs.blog.repository.BlogPostCommentReplyRepository;
import com.dominickcs.blog.repository.BlogPostCommentRepository;
import com.dominickcs.blog.repository.BlogPostRepository;

@Service
public class BlogPostService {
  @Autowired
  private BlogPostRepository blogPostRepository;

  @Autowired
  private BlogPostCommentRepository blogPostCommentRepository;

  @Autowired
  private BlogPostCommentReplyRepository blogPostCommentReplyRepository;

  public BlogPostService() {
  };

  public String addBlogPost(@RequestBody BlogPostDTO blogPostDTO, @AuthenticationPrincipal User user) throws Exception {
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
      blogPost.setBlogPostAuthor(user);

      // Save blog post to blog post repository via DTO
      blogPostRepository.save(blogPost);
      return ("Blog post creation successful! ");
    } catch (Exception e) {
      return ("An error occurred during blog post creation: " + e.toString());
    }
  }

  public String addComment(@RequestBody BlogPostCommentDTO blogPostCommentDTO, @AuthenticationPrincipal User user)
      throws Exception {
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
      blogComment.setCommentAuthor(user);

      // Save comment to comment repository via DTO
      blogPostCommentRepository.save(blogComment);

      return ("Comment successfully added to post!");
    } catch (Exception e) {
      return ("An error occurred during comment creation: " + e.toString());
    }
  }

  public String addReply(@RequestBody BlogPostCommentReplyDTO blogPostCommentReplyDTO,
      @AuthenticationPrincipal User user) throws Exception {
    try {
      BlogCommentReply blogCommentReply = new BlogCommentReply();
      LocalDateTime currentDate = LocalDateTime.now();
      BlogComment associatedBlogComment = blogPostCommentRepository
          .findById(blogPostCommentReplyDTO.getAssociatedBlogComment())
          .orElseThrow(() -> new Exception("Blog comment not found with ID: " +
              blogPostCommentReplyDTO.getAssociatedBlogComment()));
      blogCommentReply.setAssociatedBlogComment(associatedBlogComment);
      blogCommentReply.setReplyBody(blogPostCommentReplyDTO.getReplyBody());
      blogCommentReply.setReplyPublishDate(currentDate);
      blogCommentReply.setReplyAuthor(user);

      blogPostCommentReplyRepository.save(blogCommentReply);
      return ("Reply successfully added to comment!");

    } catch (Exception e) {
      return ("An error occurred during reply creation: " + e.toString());
    }
  }
}
