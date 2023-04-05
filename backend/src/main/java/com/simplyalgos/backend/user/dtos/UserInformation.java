package com.simplyalgos.backend.user.dtos;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public record UserInformation(

        @Value("#{target.userId}")
        UUID userId,
        String username,
        String firstName,
        String lastName,
        String profilePicture,
        String email,

        @Value("#{target.roles[0].roleName}")
        String role,
        boolean accountNonLocked
) {
}
