package com.simplyalgos.backend.user.dtos;

import java.util.UUID;

public record NotificationDTO(

        UUID notificationId,
        String title,
        UUID referenceId,
        String message

) {
}
