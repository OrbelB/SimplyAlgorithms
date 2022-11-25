package com.simplyalgos.backend.report;

import com.simplyalgos.backend.comment.Comment;
import com.simplyalgos.backend.user.dtos.CommentReportDTO;
import com.simplyalgos.backend.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Slf4j
@AllArgsConstructor
@Service
public class CommentReportServiceImpl implements CommentReportService {

    private final CommentReportRepository commentReportRepository;

    private final UserService userService;

    @Transactional
    @Override
    public UUID reportComment(CommentReportDTO commentReportDTO, Comment reportedComment) {

        //add report to comment
        CommentReport commentReport = commentReportRepository
                .save(CommentReport
                        .builder()
                        .report(commentReportDTO.getReportMessage())
                        .commentReportedBy(userService.getUser(commentReportDTO.getUserId()))
                        .reportedComment(reportedComment)
                        .build());
//        commentReportRepository
//                .createReport(commentReportDTO.getReportMessage(),
//                        commentReportDTO.getUserId().toString(),
//                        commentReportDTO.getCommentId().toString()
//                );
       return commentReport.getReportId();
    }
}
