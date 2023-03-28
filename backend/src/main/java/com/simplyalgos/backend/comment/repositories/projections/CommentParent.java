package com.simplyalgos.backend.comment.repositories.projections;

import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface CommentParent {

    @Column(name = "comment_id")
    UUID getCommentId();


    @Value("#{target.pageComment.pageId}")
    UUID getPageId();

    @Value("#{target.commentText}")
    String getCommentText();

    @Value("#{target.createdDate}")
    String getCreatedDate();

    @Value("#{target.likes}")
    Integer getLikes();

    @Value("#{target.dislikes}")
    Integer getDislikes();

    @Value("#{target.createdBy}")
    UserInfoOnly getCreatedBy();
    @Value("#{target.childrenComments.size()}")
    Integer getReplyCount();
}

