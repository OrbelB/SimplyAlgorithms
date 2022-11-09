package com.simplyalgos.backend.report.dtos;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
public class PageReportDTO extends BaseEntityDTO{
    UUID pageId;
}
