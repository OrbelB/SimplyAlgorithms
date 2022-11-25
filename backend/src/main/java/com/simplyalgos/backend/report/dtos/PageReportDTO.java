package com.simplyalgos.backend.report.dtos;

import com.simplyalgos.backend.report.dtos.BaseEntityDTO;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
public class PageReportDTO extends BaseEntityDTO {
    UUID pageId;
}
