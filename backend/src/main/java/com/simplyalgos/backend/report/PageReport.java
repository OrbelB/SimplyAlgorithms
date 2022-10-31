package com.simplyalgos.backend.report;

import com.simplyalgos.backend.page.PageEntity;
import com.simplyalgos.backend.user.User;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
