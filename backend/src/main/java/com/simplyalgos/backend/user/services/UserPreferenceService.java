package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.UserPreferences;
import com.simplyalgos.backend.user.dtos.UserPreferencesDTO;
import com.simplyalgos.backend.user.enums.NotificationType;

import java.util.UUID;

public interface UserPreferenceService {

    /**
     * @param notificationType the type of the notification within the enum NotificationType
     * @param userId the user that need to be checked if they have enabled the notification type
     * @return boolean if the user has enabled the notification type
     */
    boolean isNotificationEnableForType(NotificationType notificationType, UUID userId);

    /**
     * @param userId the user that need to be checked if they have enabled the notification type
     * @return UserPreferencesDTO which contains the user's preferences
     */
    UserPreferencesDTO getUserPreferences(UUID userId);

    /**
     * @param userPreferencesDTO the user's preferences that need to be updated
     * @return UserPreferencesDTO which contains the updated user's preferences
     * @implNote this method goal is to update the user's preferences and return the updated preferences
     */
    UserPreferencesDTO updateNotificationPreference(UserPreferencesDTO userPreferencesDTO);


    /**
     * @param userId the user that need to be checked if they have enabled the notification type
     * @return UserPreferences which contains the user's preferences
     * @implNote this method goal is to create a default user preferences
     * if the user doesn't have any preferences; it is usually done when the user is created
     */
    UserPreferences defaultUserPreferences(UUID userId);
}
