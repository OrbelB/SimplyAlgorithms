package com.simplyalgos.backend.comment.repositories;

import com.simplyalgos.backend.comment.domains.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM comments WHERE comment_id = :comment_id ")
    void deleteByCommentId(@Param("comment_id") String commentId);



}
