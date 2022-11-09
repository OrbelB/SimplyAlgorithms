package com.simplyalgos.backend.comment;

import com.simplyalgos.backend.comment.dto.CommentLikeDislikeDTO;

import java.util.UUID;

public interface CommentVoteService {

    void addCommentVote(CommentLikeDislikeDTO commentLikeDislikeDTO);

    Integer countVotes(UUID commentId, boolean vote);

}
