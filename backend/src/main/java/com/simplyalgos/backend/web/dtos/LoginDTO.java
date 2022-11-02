package com.simplyalgos.backend.web.dtos;

import lombok.Builder;

@Builder
public record LoginDTO(
        String username,
        String password
) {
}
