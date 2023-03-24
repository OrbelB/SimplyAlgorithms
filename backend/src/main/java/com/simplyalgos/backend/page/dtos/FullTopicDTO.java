package com.simplyalgos.backend.page.dtos;

import com.simplyalgos.backend.tag.dto.TagDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    String visualizer;
    String source;
    Date createdDate;
    String title;
    String video;
    Map<String, Object> pageDescription;
    Set<TagDTO> tags;
    WikiInfo wikiInfo;
    Set<CodeSnippetDTO> codeSnippets;
    Set<TopicExternalResourcesDTO> externalResources;
}
