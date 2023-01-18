package com.simplyalgos.backend.emailing.dtos;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
@Builder
public class EmailResponse {
    @NonNull
    String from;
    @NonNull
    String to;
    String subject;

    String body;

}
