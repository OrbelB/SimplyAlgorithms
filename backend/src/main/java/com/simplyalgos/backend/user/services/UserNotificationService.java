package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.NotificationDTO;
import com.simplyalgos.backend.user.enums.NotificationMessage;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.Set;
import java.util.UUID;

public interface UserNotificationService {

    void addNotification(UUID referenceId, String title, User user, NotificationMessage notificationMessage);

    ObjectPagedList<?> getNotifications(Pageable pageable, UUID userId);

    Set<NotificationDTO> getNotifications(UUID userId);

    UUID removeNotification(UUID notificationId);

}
