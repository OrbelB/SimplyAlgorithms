package com.simplyalgos.backend.report;

import com.simplyalgos.backend.comment.Comment;
import com.simplyalgos.backend.user.User;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
