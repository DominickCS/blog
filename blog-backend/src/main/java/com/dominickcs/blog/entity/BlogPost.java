package com.dominickcs.blog.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "blog_posts")
public class BlogPost {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private int id;

  @Column(name = "blog_publish_date", nullable = false)
  private LocalDateTime blogPublishDate;

  @Column(name = "blog_modify_date", nullable = true)
  private LocalDateTime blogModifyDate = null;

  @Column(name = "blog_post_header_url", nullable = true)
  private String blogHeaderURL;

  @Column(name = "blog_post_title", nullable = false)
  private String blogTitle;

  @Column(name = "blog_post_body", nullable = false, length = 65535)
  private String blogBody;

  @Column(name = "blog_post_tags", nullable = false)
  private List<String> blogTags;

  @Column(name = "blog_post_comments", nullable = true)
  private List<String> blogComments;

  @Column(name = "blog_post_likes", nullable = true)
  private int blogLikeCount = 0;

  @Column(name = "blog_post_saves", nullable = true)
  private int blogSaveCount = 0;

}
