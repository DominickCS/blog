package com.dominickcs.blog.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.UUID;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikedPost {

  @Column(name = "blog_post_id")
  private UUID blogPostId;

  @Column(name = "blog_post_title")
  private String blogPostTitle;
}
