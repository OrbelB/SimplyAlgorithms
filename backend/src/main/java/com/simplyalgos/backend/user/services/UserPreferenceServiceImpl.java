package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.user.domains.UserPreferences;
import com.simplyalgos.backend.user.dtos.UserPreferencesDTO;
import com.simplyalgos.backend.user.enums.NotificationType;
import com.simplyalgos.backend.user.mappers.UserPreferencesMapper;
import com.simplyalgos.backend.user.repositories.UserPreferencesRepository;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.UUID;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserPreferenceServiceImpl implements UserPreferenceService {

    private final UserPreferencesRepository userPreferencesRepository;

    private final UserPreferencesMapper userPreferencesMapper;

    @Override
    public boolean isNotificationEnableForType(@NonNull NotificationType notificationType, @NonNull UUID userId) {
        log.info(MessageFormat.format("current notification type passed is: {0} and userID {1}", notificationType.toString(), userId.toString()));
        UserPreferences userPreferences = userPreferencesRepository.findByUserId(userId).orElseThrow(() -> new ElementNotFoundException("Element could not be found"));
        return switch (notificationType) {
            case ACCOUNT_CHANGES -> userPreferences.isAccountChanges();
            case REPLIES_NOTIFICATION -> userPreferences.isRepliesNotification();
            case POST_LIKES -> userPreferences.isPostLikes();
            case POST_REPLIES -> userPreferences.isPostReplies();
            case SPECIAL_UPDATES -> userPreferences.isSpecialUpdates();
        };
    }

    @Override
    public UserPreferencesDTO getUserPreferences(UUID userId) {
        return userPreferencesMapper.userPreferencesToUserPreferencesDTO(
                userPreferencesRepository.findById(userId)
                        .orElseGet(() -> defaultUserPreferences(userId))
        );
    }


    @Override
    public UserPreferences defaultUserPreferences(UUID userId) {
        return userPreferencesRepository
                .saveAndFlush(
                        UserPreferences
                                .builder()
                                .userId(userId)
                                .accountChanges(true)
                                .postLikes(true)
                                .postReplies(true)
                                .repliesNotification(true)
                                .specialUpdates(true)
                                .build()
                );
    }

    @Override
    public UserPreferencesDTO updateNotificationPreference(@NonNull UserPreferencesDTO userPreferencesDTO) {
        // If we can't find a user create a new one with the information given
        UserPreferences userPreferences = userPreferencesRepository.findById(userPreferencesDTO.userId())
                .orElseGet(() -> userPreferencesMapper.userPreferenceDtoToUserPreference(userPreferencesDTO));
        userPreferencesMapper.updateUserPreferences(userPreferences, userPreferencesDTO);
        return userPreferencesMapper.userPreferencesToUserPreferencesDTO(userPreferencesRepository.save(userPreferences));
    }
}
