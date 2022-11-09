package com.simplyalgos.backend.report;

import com.simplyalgos.backend.report.dtos.CommentReportDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@AllArgsConstructor
@Service
public class CommentReportServiceImpl implements CommentReportService {

    private final CommentReportRepository commentReportRepository;

    @Transactional
    @Override
    public void reportComment(CommentReportDTO commentReportDTO) {

        //add report to comment
        commentReportRepository
                .createReport(commentReportDTO.getReportMessage(),
                        commentReportDTO.getUserId().toString(),
                        commentReportDTO.getCommentId().toString()
                );
    }
}
