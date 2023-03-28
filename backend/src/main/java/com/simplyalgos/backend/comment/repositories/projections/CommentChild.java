package com.simplyalgos.backend.comment.repositories.projections;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface CommentChild {

    @Value("#{target.parentComment.getCommentId}")
    UUID getRootId();


    @Value("#{target.ChildComment}")
    CommentParent getComment();
}
