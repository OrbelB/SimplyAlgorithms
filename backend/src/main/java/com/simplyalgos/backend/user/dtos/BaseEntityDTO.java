package com.simplyalgos.backend.user.dtos;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.MappedSuperclass;
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
