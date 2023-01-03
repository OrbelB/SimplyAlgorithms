package com.simplyalgos.backend.report.repositories;

import com.simplyalgos.backend.report.domains.PageReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface PageReportRepository extends JpaRepository<PageReport, UUID> {

    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO page_report(page_id, report, user_id) values (:page_id, :report, :user_id)")
    void createReport(@Param("report") String reportMessage,
                      @Param("user_id") String userId,
                      @Param("page_id") String pageId
    );
}
