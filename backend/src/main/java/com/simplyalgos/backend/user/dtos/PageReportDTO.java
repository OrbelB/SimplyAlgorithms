package com.simplyalgos.backend.user.dtos;

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
