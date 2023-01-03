package com.simplyalgos.backend.report.services;

import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.report.dtos.CommentReportDTO;

import java.util.UUID;

public interface CommentReportService {
    UUID reportComment(CommentReportDTO commentReportDTO, Comment reportedComment);
}
