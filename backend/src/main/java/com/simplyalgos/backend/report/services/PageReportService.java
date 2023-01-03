package com.simplyalgos.backend.report.services;

import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.report.dtos.PageReportDTO;

import java.util.UUID;

public interface PageReportService {

    UUID createReport(PageReportDTO pageReportDTO, PageEntity page);
}
