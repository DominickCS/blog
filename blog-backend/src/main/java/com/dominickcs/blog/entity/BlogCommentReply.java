package com.dominickcs.blog.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@Table(name = "blog_comment_replies")
public class BlogCommentReply {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "reply_body", nullable = false)
  private String replyBody;

  @Column(name = "reply_like_count")
  private int replyLikeCount = 0;

  @JoinColumn(name = "comment_id", nullable = false)
  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIgnoreProperties({ "commentReplies", "hibernateLazyInitializer", "handler" })
  @ToString.Exclude
  private BlogComment associatedBlogComment;

  @Column(name = "reply_publish_date", nullable = false)
  private LocalDateTime replyPublishDate;

  @Column(name = "reply_modify_date", nullable = true)
  private LocalDateTime replyModifyDate = null;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "reply_author_id")
  private User replyAuthor;
}
