package com.simplyalgos.backend.comment.mappers;

import com.simplyalgos.backend.comment.domains.CommentVote;
import com.simplyalgos.backend.comment.dto.CommentLikeDislikeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentVoteMapper {


    @Mapping(target = "userId", source = "userVoteReference.userId")
    @Mapping(target = "commentId", source = "commentVoteReference.commentId")
    @Mapping(target = "likeDislike",  source = "vote")
    CommentLikeDislikeDTO commentVoteToCommentVoteDTO(CommentVote commentVote);
}
