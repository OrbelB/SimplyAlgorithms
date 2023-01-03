package com.simplyalgos.backend.page.mappers;

import com.simplyalgos.backend.page.domains.PageVote;
import com.simplyalgos.backend.page.dto.LikeDislikeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PageVoteMapper {

    @Mapping(target = "userId", source = "user.userId")
    @Mapping(target = "pageId", source = "pageEntity.pageId")
    @Mapping(target = "likeDislike", source = "like_dislike")
    LikeDislikeDTO pageVoteToPageVoteDTO(PageVote pageVote);
}
