package com.simplyalgos.backend.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ParentChildCommentService {

    void createParentChildMapping(Comment comment, UUID parentCommentId);

    Page<ParentChildComment> getChildrenCommentList(UUID parentComment, Pageable pageable);
}
