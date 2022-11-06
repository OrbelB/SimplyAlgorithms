package com.simplyalgos.backend.page.mappers;

import com.simplyalgos.backend.page.Forum;
import com.simplyalgos.backend.page.dto.ForumDTO;
import com.simplyalgos.backend.page.dto.FullForumDTO;

import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.sql.Timestamp;

@Mapper(componentModel = "spring")
@DecoratedWith(ForumDecorator.class)
public interface ForumMapper {



    ForumDTO forumToForumDTO(Forum forum);

    @Mapping(source = "createdDate", target = "createdDate", qualifiedByName = "parseStringToDate")
    public Forum forumDTOToForum(ForumDTO forumDTO);

    public FullForumDTO forumToFullForumDto(Forum forum);
    @Named("parseStringToDate")
    default Timestamp parseStringToDate(String createdDate) {
        return Timestamp.valueOf(createdDate);
    }

}
