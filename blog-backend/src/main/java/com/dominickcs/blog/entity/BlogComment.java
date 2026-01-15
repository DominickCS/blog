package com.dominickcs.blog.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "blog_comments")
public class BlogComment {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private UUID id;

  @Column(name = "associated_blog_post", nullable = false)
  @ManyToOne(fetch = FetchType.LAZY)
  private BlogPost associatedBlogPost;

  @Column(name = "comment_body", nullable = false)
  private String commentBody;

  @Column(name = "comment_like_count", nullable = true)
  private int commentLikeCount;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @Column(name = "comment_replies", nullable = true)
  private List<BlogCommentReply> commentReplies;

  @Column(name = "comment_publish_date", nullable = false)
  private LocalDateTime commentPublishDate;

  @Column(name = "comment_modify_date", nullable = true)
  private LocalDateTime commentModifyDate = null;

  // ONE TO ONE USER RELATIONSHIP

}
