package com.dominickcs.blog.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dominickcs.blog.entity.User;

import lombok.Data;

@Data
public class BlogPostCommentReplyDTO {
  private UUID id;
  private String replyBody;
  private int replyLikeCount;
  private UUID associatedBlogComment;
  private LocalDateTime replyPublishDate;
  private LocalDateTime replyModifyDate;
  private User replyAuthor;
}
