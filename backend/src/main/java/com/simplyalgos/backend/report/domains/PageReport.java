package com.simplyalgos.backend.report.domains;

import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.report.domains.BaseEntity;
import com.simplyalgos.backend.user.domains.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;


import java.sql.Timestamp;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@SuperBuilder
@Entity(name = "page_report")
public class PageReport extends BaseEntity {


    public PageReport(UUID reportId, Timestamp createdDate, String report, PageEntity reportedPage, User pageReportedBy) {
        super(reportId, createdDate, report);
        this.reportedPage = reportedPage;
        this.pageReportedBy = pageReportedBy;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id")
    private PageEntity reportedPage;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User pageReportedBy;
}
