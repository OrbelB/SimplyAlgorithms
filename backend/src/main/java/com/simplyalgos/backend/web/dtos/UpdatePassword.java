package com.simplyalgos.backend.web.dtos;

import com.sun.istack.NotNull;

import java.util.UUID;

public record UpdatePassword(
        @NotNull
        UUID userId,
        @NotNull
        String oldPassword,
        @NotNull
        String newPassword
) {
}
