package com.dominickcs.blog.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@Table(name = "blog_comments")
public class BlogComment {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "blog_post_id", nullable = false)
  @JsonIgnoreProperties({ "blogComments", "hibernateLazyInitializer", "handler" })
  @ToString.Exclude
  private BlogPost associatedBlogPost;

  @Column(name = "comment_body", nullable = false)
  private String commentBody;

  @Column(name = "comment_like_count")
  private int commentLikeCount = 0;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "associatedBlogComment")
  @JsonIgnoreProperties({ "associatedBlogComment", "hibernateLazyInitializer", "handler" })
  @ToString.Exclude
  private List<BlogCommentReply> commentReplies = null;

  @Column(name = "comment_publish_date", nullable = false)
  private LocalDateTime commentPublishDate;

  @Column(name = "comment_modify_date")
  private LocalDateTime commentModifyDate = null;
}
