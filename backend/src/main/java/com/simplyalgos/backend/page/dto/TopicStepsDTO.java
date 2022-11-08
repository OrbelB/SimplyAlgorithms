package com.simplyalgos.backend.page.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TopicStepsDTO {
    UUID stepId;
    short stepNumber;
    String step;
}
