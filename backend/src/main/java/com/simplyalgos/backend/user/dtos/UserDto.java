package com.simplyalgos.backend.user.dtos;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserDto(
        String username
        , UUID userId
        , String email
) {
}
