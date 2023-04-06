package com.simplyalgos.backend.user.dtos;

public record RoleChangeForm(

        String userId,
        String username,
        String role,
        String school,
        String reasoning
) {
}
