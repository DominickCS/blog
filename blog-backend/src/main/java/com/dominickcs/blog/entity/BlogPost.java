package com.dominickcs.blog.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "blog_posts")
public class BlogPost {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private UUID id;

  @Column(name = "blog_publish_date", nullable = false)
  private LocalDateTime blogPublishDate;

  @Column(name = "blog_modify_date")
  private LocalDateTime blogModifyDate;

  @Column(name = "blog_post_header_url")
  private String blogHeaderURL;

  @Column(name = "blog_post_title", nullable = false)
  private String blogTitle;

  @Column(name = "blog_post_body", nullable = false, length = 65535)
  private String blogBody;

  @Column(name = "blog_post_tags", nullable = false)
  private List<String> blogTags;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "associatedBlogPost")
  @JsonIgnoreProperties({ "associatedBlogPost", "hibernateLazyInitializer", "handler" })
  @ToString.Exclude
  private List<BlogComment> blogComments;

  @Column(name = "blog_post_likes")
  private int blogLikeCount = 0;

  @Column(name = "blog_post_saves")
  private int blogSaveCount = 0;
}
