package com.simplyalgos.backend.comment;

import com.simplyalgos.backend.comment.dto.ChildCommentDTO;

import com.simplyalgos.backend.comment.dto.CommentDTO;
import com.simplyalgos.backend.comment.dto.CommentLikeDislikeDTO;
import com.simplyalgos.backend.report.dtos.CommentReportDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;

import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CommentService {

    ObjectPagedList<?> listComments(Pageable pageable);

    void createParentComment(CommentDTO commentDTO);

    void createChildComment(ChildCommentDTO commentDTO);

    void updateComment(CommentDTO commentDTO);

    void deleteComment(UUID commentId);

    ObjectPagedList<?> getChildrenComments(UUID parentComment, Pageable pageable);

    void commentLikeOrDisliked(CommentLikeDislikeDTO likeDislikeDTO);

    boolean isCommentPresent(UUID commentId);

    void reportComment(CommentReportDTO commentReportDTO);
}
