package com.simplyalgos.backend.universalReport.repository.projections;

import com.simplyalgos.backend.user.repositories.projections.UserAndUserIdOnly;
import org.springframework.beans.factory.annotation.Value;

import java.sql.Timestamp;

public interface UniversalReportInformation {

    @Value("#{target.reportId}")
    String getReportId();

    @Value("#{target.foreignId}")
    String getForeignId();

    @Value("#{target.typeOfForeignId}")
    String getTypeOfForeignId();

    @Value("#{target.catagory}")
    String getCatagory();

    @Value("#{target.report}")
    String getReport();

    @Value("#{target.reportDate}")
    Timestamp getReportDate();


    @Value("#{target.resolveDate}")
    Timestamp getResolveDate();


    @Value("#{target.isResolved}")
    String getIsResolved();

    @Value("#{target.resolveNote}")
    String getResolveNote();


    @Value("#{target.resolvedBy}")
    UserAndUserIdOnly getResolvedBy();

    @Value("#{target.culpritUser}")
    UserAndUserIdOnly getCulpritUser();

    @Value("#{target.victimUser}")
    UserAndUserIdOnly getVictimUser();

}
