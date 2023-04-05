package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.NotificationDTO;
import com.simplyalgos.backend.user.enums.NotificationMessage;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.Set;
import java.util.UUID;


public interface UserNotificationService {


    /**
     * @param referenceId         the reference id of the notification
     *                            (usually the id of the object that the notification is related to)
     * @param title               the title of the notification
     * @param user                the user that need to be checked if they have enabled the notification type
     * @param notificationMessage the message of the notification within the enum NotificationMessage
     * @implNote this method goal is to add a notification to the user
     * @implSpec
     */
    void addNotification(UUID referenceId, String title, User user, NotificationMessage notificationMessage);

    ObjectPagedList<?> getNotifications(Pageable pageable, UUID userId);

    Set<NotificationDTO> getNotifications(UUID userId);

    UUID removeNotification(UUID notificationId);

}
