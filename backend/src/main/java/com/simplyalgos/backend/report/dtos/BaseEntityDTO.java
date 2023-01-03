package com.simplyalgos.backend.report.dtos;

import lombok.*;
import lombok.experimental.SuperBuilder;

import jakarta.persistence.MappedSuperclass;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@MappedSuperclass
@SuperBuilder
public class BaseEntityDTO {

    UUID userId;
    String reportMessage;
}
