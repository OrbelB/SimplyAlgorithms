package com.simplyalgos.backend.report;

import com.simplyalgos.backend.page.PageEntity;
import com.simplyalgos.backend.user.dtos.PageReportDTO;

import java.util.UUID;

public interface PageReportService {

    UUID createReport(PageReportDTO pageReportDTO, PageEntity page);
}
