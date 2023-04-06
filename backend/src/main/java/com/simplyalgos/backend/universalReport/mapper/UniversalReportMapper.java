package com.simplyalgos.backend.universalReport.mapper;

import com.simplyalgos.backend.universalReport.domain.UniversalReport;
import com.simplyalgos.backend.universalReport.dto.UniversalReportDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UniversalReportMapper {


    @Mapping(source = "culpritUser.userId", target = "culpritUser")
    @Mapping(source = "victimUser.userId", target = "victimUser")
    @Mapping(source = "resolvedBy.userId", target = "resolvedBy")
    @Mapping(source = "typeOfForeignId", target = "typeOfForeignId")
    UniversalReportDTO UniversalReportToUniversalReportDTO(UniversalReport universalReport);

    @Mapping(target = "culpritUser.userId", source = "culpritUser")
    @Mapping(target = "victimUser.userId", source = "victimUser")
    @Mapping(target = "resolvedBy.userId", source = "resolvedBy")
    @Mapping(source = "typeOfForeignId", target = "typeOfForeignId")
    UniversalReport UniversalReportDTOToUniversalReport(UniversalReportDTO universalReportDTO);

}
