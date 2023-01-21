package com.simplyalgos.backend.exceptions;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ErrorHandlerDetails {
    private LocalDateTime timestamp;

    private String message;

    private String details;

    @Builder.Default
    private Integer status = 500;



}
