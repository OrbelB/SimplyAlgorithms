package com.simplyalgos.backend.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentVoteRepository extends JpaRepository<CommentVote, CommentVoteId> {


    Integer countAllByCommentVoteId_CommentIdAndVoteIs(UUID commentVoteId_commentId, boolean vote);
}
