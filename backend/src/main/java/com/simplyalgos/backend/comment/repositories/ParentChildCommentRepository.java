package com.simplyalgos.backend.comment.repositories;

import com.simplyalgos.backend.comment.domains.ParentChildComment;
import com.simplyalgos.backend.comment.domains.ParentChildCommentId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ParentChildCommentRepository extends JpaRepository<ParentChildComment, ParentChildCommentId> {


    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO parent_child_comment(parent_comment_id, child_comment_id) " +
            "values(:parent_comment_id, :child_comment_id)")
    void createChildParentMapping(@Param("parent_comment_id") String parentCommentId,
                                  @Param("child_comment_id") String childCommentId);

    Page<ParentChildComment> findAllByParentChildCommentId_ParentComment_CommentId(UUID parentCommentId,
                                                          Pageable pageable);
}
