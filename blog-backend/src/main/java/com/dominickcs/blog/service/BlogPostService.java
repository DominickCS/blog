package com.dominickcs.blog.service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

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
import com.dominickcs.blog.entity.LikedPost;
import com.dominickcs.blog.entity.SavedPost;
import com.dominickcs.blog.entity.User;
import com.dominickcs.blog.repository.BlogPostCommentReplyRepository;
import com.dominickcs.blog.repository.BlogPostCommentRepository;
import com.dominickcs.blog.repository.BlogPostRepository;
import com.dominickcs.blog.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class BlogPostService {
  @Autowired
  private BlogPostRepository blogPostRepository;

  @Autowired
  private BlogPostCommentRepository blogPostCommentRepository;

  @Autowired
  private BlogPostCommentReplyRepository blogPostCommentReplyRepository;

  @Autowired
  private UserRepository userRepository;

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

  @Transactional
  public String blogLikeHandler(@RequestBody BlogPostDTO blogPostDTO, @AuthenticationPrincipal User user)
      throws Exception {
    try {
      UUID blogPostID = blogPostDTO.getId();
      BlogPost blogPost = blogPostRepository.findById(blogPostID)
          .orElseThrow(NoSuchElementException::new);
      User managedUser = userRepository.findById(user.getId())
          .orElseThrow(NoSuchElementException::new);

      // Check if user already liked this post
      Optional<LikedPost> existingLike = managedUser.getLikedPosts().stream()
          .filter(likedPost -> likedPost.getBlogPostId().equals(blogPostID))
          .findFirst();

      if (existingLike.isEmpty()) {
        // Add like
        LikedPost likedPost = new LikedPost(blogPostID, blogPost.getBlogTitle());
        managedUser.getLikedPosts().add(likedPost);
        blogPost.setBlogLikeCount(blogPost.getBlogLikeCount() + 1);
        userRepository.save(managedUser);
        blogPostRepository.save(blogPost);
        return "Blog post was added to " + user.getUsername() + "'s likes.";
      } else {
        // Remove like
        managedUser.getLikedPosts().remove(existingLike.get());
        blogPost.setBlogLikeCount(blogPost.getBlogLikeCount() - 1);
        userRepository.save(managedUser);
        blogPostRepository.save(blogPost);
        return "Blog post was removed from " + user.getUsername() + "'s likes.";
      }
    } catch (Exception e) {
      return "An error occurred during like transaction: " + e.toString();
    }
  }

  @Transactional
  public String blogSaveHandler(@RequestBody BlogPostDTO blogPostDTO, @AuthenticationPrincipal User user)
      throws Exception {
    try {
      UUID blogPostID = blogPostDTO.getId();
      BlogPost blogPost = blogPostRepository.findById(blogPostID)
          .orElseThrow(NoSuchElementException::new);
      User managedUser = userRepository.findById(user.getId())
          .orElseThrow(NoSuchElementException::new);

      // Check if user already liked this post
      Optional<SavedPost> existingSave = managedUser.getSavedPosts().stream()
          .filter(savedPost -> savedPost.getBlogPostId().equals(blogPostID))
          .findFirst();

      if (existingSave.isEmpty()) {
        // Add like
        SavedPost savedPost = new SavedPost(blogPostID, blogPost.getBlogTitle());
        managedUser.getSavedPosts().add(savedPost);
        blogPost.setBlogSaveCount(blogPost.getBlogSaveCount() + 1);
        userRepository.save(managedUser);
        blogPostRepository.save(blogPost);
        return "Blog post was added to " + user.getUsername() + "'s bookmarks.";
      } else {
        // Remove like
        managedUser.getSavedPosts().remove(existingSave.get());
        blogPost.setBlogSaveCount(blogPost.getBlogSaveCount() - 1);
        userRepository.save(managedUser);
        blogPostRepository.save(blogPost);
        return "Blog post was removed from " + user.getUsername() + "'s bookmarks.";
      }
    } catch (Exception e) {
      return "An error occurred during like transaction: " + e.toString();
    }
  }

  @Transactional
  public String commentLikeHandler(@RequestBody BlogPostCommentDTO blogPostCommentDTO,
      @AuthenticationPrincipal User user)
      throws Exception {
    try {
      UUID blogCommentID = blogPostCommentDTO.getId();
      BlogComment blogComment = blogPostCommentRepository.findById(blogCommentID)
          .orElseThrow(NoSuchElementException::new);

      User managedUser = userRepository.findById(user.getId())
          .orElseThrow(NoSuchElementException::new);

      if (!managedUser.getLikedComments().contains(blogCommentID)) {
        managedUser.getLikedComments().add(blogCommentID);
        blogComment.setCommentLikeCount(blogComment.getCommentLikeCount() + 1);
        userRepository.save(managedUser);
        blogPostCommentRepository.save(blogComment);
        return ("Like to comment was added to " + managedUser.getUsername().toString() + "'s liked comments.");
      } else {
        managedUser.getLikedComments().remove(blogCommentID);
        blogComment.setCommentLikeCount(blogComment.getCommentLikeCount() - 1);
        userRepository.save(managedUser);
        blogPostCommentRepository.save(blogComment);
        return ("Like to comment was removed from " + managedUser.getUsername().toString() + "'s liked comments.");
      }
    } catch (Exception e) {
      return ("An error occurred during like transaction: " + e.toString());
    }
  }

  @Transactional
  public String replyLikeHandler(@RequestBody BlogPostCommentReplyDTO blogPostCommentReplyDTO,
      @AuthenticationPrincipal User user)
      throws Exception {
    try {
      UUID replyID = blogPostCommentReplyDTO.getId();
      BlogCommentReply blogCommentReply = blogPostCommentReplyRepository.findById(replyID)
          .orElseThrow(NoSuchElementException::new);

      User managedUser = userRepository.findById(user.getId())
          .orElseThrow(NoSuchElementException::new);

      if (!managedUser.getLikedReplies().contains(replyID)) {
        managedUser.getLikedReplies().add(replyID);
        blogCommentReply.setReplyLikeCount(blogCommentReply.getReplyLikeCount() + 1);
        userRepository.save(managedUser);
        blogPostCommentReplyRepository.save(blogCommentReply);
        return ("Like to reply was added to " + managedUser.getUsername().toString() + "'s liked comments.");
      } else {
        managedUser.getLikedReplies().remove(replyID);
        blogCommentReply.setReplyLikeCount(blogCommentReply.getReplyLikeCount() - 1);
        userRepository.save(managedUser);
        blogPostCommentReplyRepository.save(blogCommentReply);
        return ("Like to reply was removed from " + managedUser.getUsername().toString() + "'s liked comments.");
      }
    } catch (Exception e) {
      return ("An error occurred during like transaction: " + e.toString());
    }
  }

  @Transactional
  public String deleteBlogPost(@RequestBody BlogPostDTO blogPostDTO)
      throws Exception {
    BlogPost postToDelete = blogPostRepository.findById(blogPostDTO.getId()).orElseThrow(NoSuchElementException::new);
    userRepository.removeSavedPostFromAllUsers(blogPostDTO.getId());
    userRepository.removeLikedPostFromAllUsers(blogPostDTO.getId());
    blogPostRepository.delete(postToDelete);
    return ("Blog post deleted successfully!");
  }

}
