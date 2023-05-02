package com.simplyalgos.backend.universalReport.mapper;

import com.simplyalgos.backend.universalReport.domain.UniversalReport;
import com.simplyalgos.backend.universalReport.dto.UniversalReportDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UniversalReportMapper {


    @Mapping(source = "culpritUser.userId", target = "culpritUser.userId")
    @Mapping(source = "victimUser.userId", target = "victimUser.userId")
    @Mapping(source = "resolvedBy.userId", target = "resolvedBy.userId")
    @Mapping(source = "culpritUser.username", target = "culpritUser.username")
    @Mapping(source = "victimUser.username", target = "victimUser.username")
    @Mapping(source = "resolvedBy.username", target = "resolvedBy.username")
    @Mapping(source = "typeOfForeignId", target = "typeOfForeignId")
    UniversalReportDTO UniversalReportToUniversalReportDTO(UniversalReport universalReport);

    @Mapping(source = "culpritUser.userId", target = "culpritUser.userId")
    @Mapping(source = "victimUser.userId", target = "victimUser.userId")
    @Mapping(source = "resolvedBy.userId", target = "resolvedBy.userId")
    @Mapping(source = "culpritUser.username", target = "culpritUser.username")
    @Mapping(source = "victimUser.username", target = "victimUser.username")
    @Mapping(source = "resolvedBy.username", target = "resolvedBy.username")
    @Mapping(source = "typeOfForeignId", target = "typeOfForeignId")
    UniversalReport UniversalReportDTOToUniversalReport(UniversalReportDTO universalReportDTO);

}
