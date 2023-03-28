package com.simplyalgos.backend.comment.services;

import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.repositories.projections.CommentChild;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ParentChildCommentService {

    void createParentChildMapping(Comment comment, UUID parentCommentId);

    Page<CommentChild> getChildrenCommentList(UUID parentComment, Pageable pageable);
}
