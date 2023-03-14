package com.simplyalgos.backend.page.dtos;

import com.simplyalgos.backend.comment.dto.CommentBasicDTO;
import com.simplyalgos.backend.tag.dto.TagDTO;
import lombok.*;

import java.util.Date;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FullTopicDTO {

    UUID pageId;
    UUID userId;
    Date createdDate;
    String title;
    String video;
    Map<String, Object> pageDescription;
    Set<TagDTO> tags;
    Set<CommentBasicDTO> comments;
    Set<CodeSnippetDTO> codeSnippet;
    Set<TopicStepsDTO> steps;
    Set<TopicExternalResourcesDTO> externalResources;
}
