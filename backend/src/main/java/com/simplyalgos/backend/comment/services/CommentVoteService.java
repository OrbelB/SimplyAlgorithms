package com.simplyalgos.backend.comment.services;

import com.simplyalgos.backend.comment.domains.CommentVoteId;
import com.simplyalgos.backend.comment.dto.CommentLikeDislikeDTO;

import java.util.Set;
import java.util.UUID;

public interface CommentVoteService {

    CommentLikeDislikeDTO addCommentVote(CommentLikeDislikeDTO commentLikeDislikeDTO);

    Integer countVotes(UUID commentId, boolean vote);


    void deleteCommentVote(UUID userId, UUID commentId);

    boolean commentVoteExists(CommentVoteId commentVoteId);

    @Deprecated
    Set<?> listVotesByPage(UUID pageId);

    Set<?> listVotesByPageAndUserId(UUID pageId, UUID userId);
}
