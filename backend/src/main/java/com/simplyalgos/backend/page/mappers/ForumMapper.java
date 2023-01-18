package com.simplyalgos.backend.page.mappers;

import com.simplyalgos.backend.page.domains.Forum;
import com.simplyalgos.backend.page.dtos.ForumDTO;
import com.simplyalgos.backend.page.dtos.FullForumDTO;

import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.sql.Timestamp;

@Mapper(componentModel = "spring")
@DecoratedWith(ForumDecorator.class)
public interface ForumMapper {

    @Mapping(target = "userDto", ignore = true)
    @Mapping(target = "tags", ignore = true)
    ForumDTO forumToForumDTO(Forum forum);

    @Mapping(target = "pageEntityId", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(source = "createdDate", target = "createdDate", qualifiedByName = "parseStringToDate")
    public Forum forumDTOToForum(ForumDTO forumDTO);

    @Mapping(target = "userDto", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "comments", ignore = true)
    public FullForumDTO forumToFullForumDto(Forum forum);

    @Named("parseStringToDate")
    default Timestamp parseStringToDate(String createdDate) {
        return Timestamp.valueOf(createdDate);
    }

}
