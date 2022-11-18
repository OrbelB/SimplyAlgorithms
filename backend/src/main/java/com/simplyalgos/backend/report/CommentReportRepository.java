package com.simplyalgos.backend.report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface CommentReportRepository extends JpaRepository<CommentReport, UUID> {

    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO comment_report(comment_id, report, user_id) values (:comment_id, :report, :user_id)")
    CommentReport createReport(@Param("report") String reportMessage,
                      @Param("user_id") String userId,
                      @Param("comment_id") String commentId
    );
}
