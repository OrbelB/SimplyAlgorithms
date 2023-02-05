package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.UserPreferences;
import com.simplyalgos.backend.user.dtos.UserPreferencesDTO;
import com.simplyalgos.backend.user.enums.NotificationType;

import java.util.UUID;

public interface UserPreferenceService {

    boolean isNotificationEnableForType(NotificationType notificationType, UUID userId);

    UserPreferencesDTO getUserPreferences(UUID userId);

    UserPreferencesDTO updateNotificationPreference(UserPreferencesDTO userPreferencesDTO);

    UserPreferences defaultUserPreferences(UUID userId);
}
