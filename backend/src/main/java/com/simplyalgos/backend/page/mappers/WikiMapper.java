package com.simplyalgos.backend.page.mappers;


import com.simplyalgos.backend.page.domains.Wiki;
import com.simplyalgos.backend.page.dtos.WikiDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface WikiMapper {


    @Mapping(target = "pageIds", ignore = true)
    WikiDTO wikiToWikiDTO(Wiki wiki);


    Wiki wikiDTOToWiki(WikiDTO wikiDTO);
}
