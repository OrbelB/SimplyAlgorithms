package com.simplyalgos.backend.user.dtos;

import java.util.UUID;

public record UserPreferencesDTO(

        UUID userId,
        boolean accountChanges,
        boolean repliesNotification,
        boolean postLikes,
        boolean postReplies,
        boolean specialUpdates
) {
}
