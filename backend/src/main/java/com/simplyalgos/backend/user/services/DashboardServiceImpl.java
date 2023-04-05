package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.repositories.projection.ForumInformation;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.DashboardDTO;
import com.simplyalgos.backend.user.enums.NotificationMessage;
import com.simplyalgos.backend.user.enums.NotificationType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;


@RequiredArgsConstructor
@Slf4j
@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserPreferenceService userPreferenceService;

    private final UserNotificationService userNotificationService;

    private final UserHistoryService userHistoryService;


    @Override
    public DashboardDTO displayNotifications(UUID userId) {
        DashboardDTO.DashboardDTOBuilder dashboard = DashboardDTO.builder();
        dashboard.userId(userId);
        dashboard.dayStreak(userHistoryService.getUserStreakDays(userId));
        dashboard.notifications(userNotificationService.getNotifications(userId));
        return dashboard.build();
    }

    @Override
    public void addForumNotification(ForumInformation forumDTO, User userToNotified) {
        if (userPreferenceService
                .isNotificationEnableForType(NotificationType.POST_REPLIES, userToNotified.getUserId())) {
            userNotificationService
                    .addNotification(forumDTO.getPageId(),
                            forumDTO.getTitle(),
                            userToNotified,
                            NotificationMessage.FORUM);
        }
    }

    @Override
    public void addAdminNotification(User userToNotified, String requester) {
        if (userPreferenceService.isNotificationEnableForType(NotificationType.ADMIN_NOTIFICATION, userToNotified.getUserId())) {
            userNotificationService.addNotification(UUID.randomUUID(), requester.concat(" Requested role change"),
                    userToNotified, NotificationMessage.ROLE_REQUEST);
        }
    }

    @Override
    public void addPasswordResetNotification(User userToNotified) {
        if (userPreferenceService.isNotificationEnableForType(NotificationType.ACCOUNT_CHANGES, userToNotified.getUserId())) {
            userNotificationService.addNotification(UUID.randomUUID(), "Password Reset",
                    userToNotified, NotificationMessage.PASSWORD_UPDATE);
        }
    }


    @Override
    public void addAccountChangesNotification(User userToNotified) {
        if (userPreferenceService.isNotificationEnableForType(NotificationType.ACCOUNT_CHANGES, userToNotified.getUserId())) {
            userNotificationService.addNotification(UUID.randomUUID(), "Changes on your account",
                    userToNotified, NotificationMessage.ACCOUNT_CHANGE);
        }
    }

    @Override
    public void addRoleChangeNotification(User userToNotified, String newRole) {
        if (userPreferenceService.isNotificationEnableForType(NotificationType.ACCOUNT_CHANGES, userToNotified.getUserId())) {
            userNotificationService.addNotification(
                    UUID.randomUUID(),"Your role has been changed to: ".concat(newRole),
                    userToNotified, NotificationMessage.ROLE_CHANGE);
        }
    }


    @Override
    public void addSpecialSystemUpdateNotification(User userToNotified) {
        if (userPreferenceService.isNotificationEnableForType(NotificationType.SPECIAL_UPDATES, userToNotified.getUserId())) {
            userNotificationService.addNotification(UUID.randomUUID(), "System Update",
                    userToNotified, NotificationMessage.SYSTEM_UPDATE);
        }
    }

    @Override
    public void addTopicNotification(Topic fullTopicDTO, User userToNotified) {
        if (userPreferenceService.isNotificationEnableForType(NotificationType.REPLIES_NOTIFICATION, userToNotified.getUserId())) {
            userNotificationService.addNotification(
                    fullTopicDTO.getPageId(),
                    fullTopicDTO.getTitle(),
                    userToNotified,
                    NotificationMessage.REPLY
            );
        }
    }
}
