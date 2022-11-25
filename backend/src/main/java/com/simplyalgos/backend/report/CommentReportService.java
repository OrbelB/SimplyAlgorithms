package com.simplyalgos.backend.report;

import com.simplyalgos.backend.comment.Comment;
import com.simplyalgos.backend.report.dtos.CommentReportDTO;

import java.util.UUID;

public interface CommentReportService {
    UUID reportComment(CommentReportDTO commentReportDTO, Comment reportedComment);
}
