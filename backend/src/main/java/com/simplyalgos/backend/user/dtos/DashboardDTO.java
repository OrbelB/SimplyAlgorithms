package com.simplyalgos.backend.user.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
public class DashboardDTO {

    UUID userId;
    short dayStreak;
    Set<NotificationDTO> notifications;
}
