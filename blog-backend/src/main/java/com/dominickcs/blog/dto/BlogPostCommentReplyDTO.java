package com.dominickcs.blog.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dominickcs.blog.entity.BlogComment;

import lombok.Data;

@Data
public class BlogPostCommentReplyDTO {
  private UUID id;
  private String replyBody;
  private int replyLikeCount;
  private BlogComment associatedBlogComment;
  private LocalDateTime replyPublishDate;
  private LocalDateTime replyModifyDate;
}
