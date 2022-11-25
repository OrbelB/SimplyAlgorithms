package com.simplyalgos.backend.comment;

import com.simplyalgos.backend.comment.dto.*;

import com.simplyalgos.backend.report.dtos.CommentReportDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;

import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CommentService {

    ObjectPagedList<?> listComments(Pageable pageable);

    CommentToSendDTO createParentComment(CommentDTO commentDTO);

    CommentToSendDTO createChildComment(ChildCommentDTO commentDTO);

    CommentToSendDTO updateComment(CommentDTO commentDTO);

    UUID deleteComment(UUID commentId);

    ObjectPagedList<?> getChildrenComments(UUID parentComment, Pageable pageable);

    CommentLikeDislikeDTO commentLikeOrDisliked(CommentLikeDislikeDTO likeDislikeDTO);

    void updateCommentVotes(UUID commentId);

    boolean isCommentPresent(UUID commentId);

    CommentVoteId deleteVote(UUID userId, UUID commentId);

    UUID reportComment(CommentReportDTO commentReportDTO);
}
