package com.simplyalgos.backend.report.domains;

import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.report.domains.BaseEntity;
import com.simplyalgos.backend.user.domains.User;
import lombok.*;
import lombok.experimental.SuperBuilder;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity(name = "comment_report")
public class CommentReport extends BaseEntity {


    public CommentReport(UUID reportId, Timestamp createdDate, String report, Comment reportedComment, User commentReportedBy) {
        super(reportId, createdDate, report);
        this.reportedComment = reportedComment;
        this.commentReportedBy = commentReportedBy;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "comment_id")
    private Comment reportedComment;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User commentReportedBy;
}
