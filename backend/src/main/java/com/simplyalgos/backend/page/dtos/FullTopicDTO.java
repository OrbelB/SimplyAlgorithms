package com.simplyalgos.backend.page.dtos;

import com.simplyalgos.backend.comment.dto.CommentBasicDTO;
import com.simplyalgos.backend.tag.dto.TagDTO;
import lombok.*;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FullTopicDTO {

    UUID pageId;
    Date createdDate;
    String title;
    String video;
    String runningTime;
    String timeComplexity;
    String explanation;
    Set<TagDTO> tags;
    Set<CommentBasicDTO> comments;
    Set<CodeSnippetDTO> codeSnippet;
    Set<TopicStepsDTO> steps;
    Set<TopicExternalResourcesDTO> externalResources;
}
