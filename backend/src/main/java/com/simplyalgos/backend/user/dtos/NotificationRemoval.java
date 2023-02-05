package com.simplyalgos.backend.user.dtos;

import java.util.UUID;

public record NotificationRemoval(
        UUID userId,
        UUID notificationId
) {
}
