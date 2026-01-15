package com.dominickcs.blog.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.dominickcs.blog.entity.BlogComment;

import lombok.Data;

@Data
public class BlogPostDTO {
  private UUID id;
  private String blogHeaderURL;
  private String blogTitle;
  private String blogBody;
  private List<String> blogTags;
  private List<BlogComment> blogComments;
  private int blogLikeCount;
  private int blogSaveCount;
  private LocalDateTime blogPublishDate;
  private LocalDateTime blogModifyDate;
  private String searchQuery;
}
