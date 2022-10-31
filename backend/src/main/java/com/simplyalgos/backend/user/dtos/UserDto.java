package com.simplyalgos.backend.user.dtos;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserDto(
        String username
        , UUID user_id
        , String email
) {
}
