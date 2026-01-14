package com.dominickcs.blog.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class BlogPostDTO {
  private int id;
  private String blogHeaderURL;
  private String blogTitle;
  private String blogBody;
  private List<String> blogTags;
  private List<String> blogComments;
  private int blogLikeCount;
  private int blogSaveCount;
  private LocalDateTime blogPublishDate;
  private LocalDateTime blogModifyDate;
}
