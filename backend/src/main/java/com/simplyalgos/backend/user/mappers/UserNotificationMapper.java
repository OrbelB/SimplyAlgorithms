package com.simplyalgos.backend.user.mappers;


import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.domains.UserNotification;
import com.simplyalgos.backend.user.dtos.NotificationDTO;
import org.mapstruct.Mapper;

import java.util.Set;
import java.util.UUID;

@Mapper(componentModel = "spring")
public interface UserNotificationMapper {
    UserNotification createUserNotification(String title, String message, short notificationQuantity,
                                   UUID referenceId, User userNotification);

    Set<NotificationDTO> notificationToNotificationDTO(Set<UserNotification> userNotification);
}
