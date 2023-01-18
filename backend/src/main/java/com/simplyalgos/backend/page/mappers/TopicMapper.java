package com.simplyalgos.backend.page.mappers;

import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.dtos.FullTopicDTO;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
@DecoratedWith(TopicDecorator.class)
public interface TopicMapper {

    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "steps", ignore = true)
    @Mapping(target = "externalResources", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "codeSnippet", ignore = true)
    FullTopicDTO topicToFullTopicDTO(Topic topic);
}
