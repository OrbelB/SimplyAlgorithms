package com.simplyalgos.backend.report.services;

import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.report.domains.PageReport;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.report.repositories.PageReportRepository;
import com.simplyalgos.backend.report.services.PageReportService;
import com.simplyalgos.backend.user.services.UserService;
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
