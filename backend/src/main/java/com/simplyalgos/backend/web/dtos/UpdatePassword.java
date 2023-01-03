package com.simplyalgos.backend.web.dtos;

import org.springframework.lang.NonNull;

import java.util.UUID;

public record UpdatePassword(

        @NonNull
        UUID userId,

        @NonNull
        String oldPassword,

        @NonNull
        String newPassword
) {
}
