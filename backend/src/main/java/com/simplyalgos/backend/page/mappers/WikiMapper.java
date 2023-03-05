package com.simplyalgos.backend.page.mappers;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.simplyalgos.backend.page.domains.Wiki;
import com.simplyalgos.backend.page.dtos.WikiDTO;
import com.simplyalgos.backend.utils.CustomObjectMapper;
import org.mapstruct.*;

import java.util.Map;


@Mapper(componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface WikiMapper {


    @Mapping(target = "pageIds", ignore = true)
    WikiDTO wikiToWikiDTO(Wiki wiki);


    Wiki wikiDTOToWiki(WikiDTO wikiDTO);

    @Named("MapToString")
    default String parseJsonToString(Map<String, Object> description) throws JsonProcessingException {
        return CustomObjectMapper.getObjectMapper().writeValueAsString(description);
    }

    @Named("MapToString")
    default String parseJsonToString(String description) {
        return description;
    }

    @Named("parseStringToJsonObject")
    default Map<String, Object> map(String description) throws JsonProcessingException {
        return CustomObjectMapper.getObjectMapper().readValue(description, Map.class);
    }
}
