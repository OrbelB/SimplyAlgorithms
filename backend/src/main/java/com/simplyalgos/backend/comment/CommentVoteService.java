package com.simplyalgos.backend.comment;

import com.simplyalgos.backend.comment.dto.CommentLikeDislikeDTO;

import java.util.Set;
import java.util.UUID;

public interface CommentVoteService {

    CommentLikeDislikeDTO addCommentVote(CommentLikeDislikeDTO commentLikeDislikeDTO);

    Integer countVotes(UUID commentId, boolean vote);


    void deleteCommentVote(UUID userId,UUID commentId);
    boolean commentVoteExists(CommentVoteId commentVoteId);
    Set<?> listVotesByPage(UUID pageId);
}
