package com.simplyalgos.backend.comment.services;

import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.domains.ParentChildComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ParentChildCommentService {

    void createParentChildMapping(Comment comment, UUID parentCommentId);

    Page<ParentChildComment> getChildrenCommentList(UUID parentComment, Pageable pageable);
}
