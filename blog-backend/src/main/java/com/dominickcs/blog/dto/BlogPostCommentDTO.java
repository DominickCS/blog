package com.dominickcs.blog.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.dominickcs.blog.entity.BlogCommentReply;
import com.dominickcs.blog.entity.User;

import lombok.Data;

@Data
public class BlogPostCommentDTO {
  private UUID id;
  private UUID associatedBlogPostID;
  private String commentBody;
  private int commentLikeCount;
  private List<BlogCommentReply> commentReplies;
  private LocalDateTime commentPublishDate;
  private LocalDateTime commentModifyDate;
  private User commentAuthor;
}
