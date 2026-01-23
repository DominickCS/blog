package com.dominickcs.blog.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dominickcs.blog.dto.BlogPostCommentDTO;
import com.dominickcs.blog.dto.BlogPostCommentReplyDTO;
import com.dominickcs.blog.dto.BlogPostDTO;
import com.dominickcs.blog.entity.BlogPost;
import com.dominickcs.blog.entity.User;
import com.dominickcs.blog.repository.BlogPostRepository;
import com.dominickcs.blog.repository.UserRepository;
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

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/new/post")
  public String addNewBlogPost(@RequestBody BlogPostDTO blogPostDTO, @AuthenticationPrincipal User user)
      throws Exception {
    return blogPostService.addBlogPost(blogPostDTO, user);
  }

  @PostMapping("/new/comment")
  public String addNewBlogComment(@RequestBody BlogPostCommentDTO blogPostCommentDTO,
      @AuthenticationPrincipal User user) throws Exception {
    return blogPostService.addComment(blogPostCommentDTO, user);
  }

  @PostMapping("/new/reply")
  public String addNewCommentReply(@RequestBody BlogPostCommentReplyDTO blogPostCommentReplyDTO,
      @AuthenticationPrincipal User user) throws Exception {
    return blogPostService.addReply(blogPostCommentReplyDTO, user);
  }

  @GetMapping("/posts/all")
  public List<BlogPost> getAllBlogPosts() {
    return blogPostRepository.findByOrderByBlogPublishDateDesc();
  }

  @PostMapping("/posts/single")
  public Optional<BlogPost> getBlogPost(@RequestBody BlogPostDTO blogPostDTO) throws Exception {
    return blogPostRepository.findById(blogPostDTO.getId());
  }

  @PostMapping("/posts/search")
  public List<BlogPost> findBlogPost(@RequestBody BlogPostDTO blogPostDTO) {
    String searchQuery = blogPostDTO.getSearchQuery();
    return blogPostRepository.findByOrderByBlogPublishDateDesc().stream()
        .filter(result -> result.getBlogTitle().toLowerCase().contains(searchQuery.toLowerCase()))
        .collect(Collectors.toList());
  }

  @GetMapping("/users/currentuser")
  public Optional<User> getCurrentUser(@AuthenticationPrincipal User user) {
    return userRepository.findByUsername(user.getUsername());
  }

  @PostMapping("/like/post")
  public String addBlogPostLike(@RequestBody BlogPostDTO blogPostDTO, @AuthenticationPrincipal User user)
      throws Exception {
    return blogPostService.blogLikeHandler(blogPostDTO, user);
  }

  @PostMapping("/like/comment")
  public String addCommentLike(@RequestBody BlogPostCommentDTO blogPostCommentDTO, @AuthenticationPrincipal User user)
      throws Exception {
    return blogPostService.commentLikeHandler(blogPostCommentDTO, user);
  }

  @PostMapping("/like/reply")
  public String addReplyLike(@RequestBody BlogPostCommentReplyDTO blogPostCommentReplyDTO,
      @AuthenticationPrincipal User user) throws Exception {
    return blogPostService.replyLikeHandler(blogPostCommentReplyDTO, user);
  }

  @PostMapping("/bookmark")
  public String addBlogBookmark(@RequestBody BlogPostDTO blogPostDTO, @AuthenticationPrincipal User user)
      throws Exception {
    return blogPostService.blogSaveHandler(blogPostDTO, user);
  }

}
