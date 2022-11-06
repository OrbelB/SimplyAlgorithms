package com.simplyalgos.backend.web.dtos;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class TokenDTO {
    String userId;
    String accessToken;
    String refreshToken;
}
