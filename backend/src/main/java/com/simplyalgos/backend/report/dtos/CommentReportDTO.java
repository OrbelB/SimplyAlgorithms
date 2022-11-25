package com.simplyalgos.backend.report.dtos;

import com.simplyalgos.backend.report.dtos.BaseEntityDTO;
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
