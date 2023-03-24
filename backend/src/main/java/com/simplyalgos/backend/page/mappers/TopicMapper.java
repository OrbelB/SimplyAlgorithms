package com.simplyalgos.backend.page.mappers;

import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.dtos.FullTopicDTO;
import com.simplyalgos.backend.page.dtos.PageBasicInfo;
import org.mapstruct.*;


@Mapper(componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
@DecoratedWith(TopicDecorator.class)
public interface TopicMapper {

    PageBasicInfo pageToPageBasicInfo(Topic topic);

    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "externalResources", ignore = true)
    // @Mapping(target = "comments", ignore = true)
    @Mapping(target = "codeSnippets", ignore = true)
    FullTopicDTO topicToFullTopicDTO(Topic topic);

    @Mapping(target = "pageId", ignore = true)
    @Mapping(target = "codeSnippets", ignore = true)
    @Mapping(target = "topicExternalResources", ignore = true)
    @Mapping(target = "visualizer", source = "visualizer")
    Topic fullTopicDTOToTopic(FullTopicDTO fullTopicDTO);

    @Mapping(target = "pageId", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "codeSnippets", ignore = true)
    @Mapping(target = "topicExternalResources", ignore = true)
    @Mapping(target= "pageDescription", ignore = true)
    void updateTopicFromFullTopicDto(FullTopicDTO fullTopicDTO, @MappingTarget Topic topic);
}
