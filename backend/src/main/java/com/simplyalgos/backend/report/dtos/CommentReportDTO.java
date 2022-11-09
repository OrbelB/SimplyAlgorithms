package com.simplyalgos.backend.report.dtos;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@SuperBuilder
public class CommentReportDTO extends BaseEntityDTO {
    UUID commentId;
}
