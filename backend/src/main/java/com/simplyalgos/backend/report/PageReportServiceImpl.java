package com.simplyalgos.backend.report;

import com.simplyalgos.backend.page.PageEntity;
import com.simplyalgos.backend.user.dtos.PageReportDTO;
import com.simplyalgos.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class PageReportServiceImpl implements PageReportService {

    private final UserService userService;
    private final PageReportRepository pageReportRepository;

    @Override
    public UUID createReport(PageReportDTO pageReportDTO, PageEntity page) {
        return pageReportRepository.save(PageReport
                .builder()
                .pageReportedBy(userService.getUser(pageReportDTO.getUserId()))
                .reportedPage(page)
                .report(pageReportDTO.getReportMessage())
                .build()).getReportId();
    }
}
