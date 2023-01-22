package com.simplyalgos.backend.emailing.dtos;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class EmailResponse {
    @NonNull
    String from;
    @NonNull
    String to;
    String subject;

    String body;

}
