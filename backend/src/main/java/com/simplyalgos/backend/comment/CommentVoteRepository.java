package com.simplyalgos.backend.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;
import java.util.UUID;

public interface CommentVoteRepository extends JpaRepository<CommentVote, CommentVoteId> {


    Integer countAllByCommentVoteId_CommentIdAndVoteIs(UUID commentVoteId_commentId, boolean vote);

    Set<CommentVote> findAllByCommentVoteId_CommentId(UUID commentVoteId_commentId);

    void deleteByCommentVoteId(CommentVoteId commentVoteId);
    Set<CommentVote> findAllByCommentVoteReference_PageComment_PageId(UUID commentVoteReference_pageComment_pageId);
    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM comment_vote WHERE user_id = :user_id AND comment_id = :comment_id")
    void deleteCommentVote(@Param("user_id") String userId, @Param("comment_id") String commentId);
}
