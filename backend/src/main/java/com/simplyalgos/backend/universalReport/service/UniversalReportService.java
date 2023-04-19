package com.simplyalgos.backend.universalReport.service;

import com.simplyalgos.backend.universalReport.dto.UniversalReportDTO;
import com.simplyalgos.backend.user.enums.NotificationMessage;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;


import java.util.*;

public interface UniversalReportService {

    void generateAdminNotification(UniversalReportDTO universalReportDTO, NotificationMessage notificationMessage);

//    CreateReport
    UUID createReport(UniversalReportDTO universalReportDTO);

    void notifyAllAdminsAboutNewReport(UniversalReportDTO universalReportDTO);

    void notifyUserRegardingClosedReport(UniversalReportDTO universalReportDTO);

//    DeleteReport
    UUID deleteReport(UUID reportId);
//    UpdateReport
    UniversalReportDTO updateReport(UniversalReportDTO universalReportDTO);

//    GetReport
    UniversalReportDTO getUniversalReport(UUID reportId);

//    ListReport - list if resolved or unresolved
    ObjectPagedList<?> listReport(Pageable pageable);


    ObjectPagedList<?> listByVictum(Pageable pageable, String userIdOrUsername);

    ObjectPagedList<?> listByCulprit(Pageable pageable, String userIdOrUsername);

    ObjectPagedList<?> listByResolver(Pageable pageable, String userIdOrUsername);


    void emailReportToAllAdmins(String subject, String body);

}
