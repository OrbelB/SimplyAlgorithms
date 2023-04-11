package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.repositories.projection.ForumInformation;
import com.simplyalgos.backend.universalReport.dto.UniversalReportDTO;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.enums.NotificationMessage;
import com.simplyalgos.backend.user.enums.NotificationType;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
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
    public ObjectPagedList<?> displayNotifications(UUID userId, Pageable pageable) {


        return userNotificationService.getNotifications(pageable,userId);
    }

    @Override
    public int displayUserDayStreak(UUID userId) {
        return userHistoryService.getUserStreakDays(userId);
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
    public void addAdminNotification(User userToNotified, String message) {
        if (userPreferenceService.isNotificationEnableForType(NotificationType.ADMIN_NOTIFICATION, userToNotified.getUserId())) {
            userNotificationService.addRoleRequestChangeNotification(UUID.randomUUID(), "Role Change Request",
                    userToNotified, NotificationMessage.ROLE_REQUEST, message);
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

//    Universal report notification

    @Override
    public void addReportResolvedNotification(User userToNotify, UniversalReportDTO universalReportDTO) {
        if (userPreferenceService.isNotificationEnableForType(NotificationType.SPECIAL_UPDATES, userToNotify.getUserId())){
            log.debug("Sending a resolved notification to user");
            userNotificationService.addUniversalReportNotification(
                    userToNotify,
                    universalReportDTO.getReportId(),
                    universalReportDTO.getCatagory() + " report has been resolved, thank you for being vigilant",
                    universalReportDTO.getResolveNote(),
                    NotificationMessage.REPORT_RESOLVED
            );
        }
    }

    @Override
    public void addProfanityReportNotification(UniversalReportDTO universalReportDTO) {
        log.debug("sending a Profanity report to all Admins");
        userNotificationService.addUniversalReportNotification(
                User.builder().build(),
                universalReportDTO.getReportId(),
                createTitle(universalReportDTO),
                createMessage(universalReportDTO),
                NotificationMessage.PROFANITY_REPORT
        );
    }

    @Override
    public void addIncorrectInformationReportNotification(UniversalReportDTO universalReportDTO) {
        log.debug("sending a Incorrect information to all admins");
        userNotificationService.addUniversalReportNotification(
                User.builder().build(),
                universalReportDTO.getReportId(),
                createTitle(universalReportDTO),
                createMessage(universalReportDTO),
                NotificationMessage.INCORRECT_INFORMATION_REPORT
        );

    }

    @Override
    public void addErrorReportNotification(UniversalReportDTO universalReportDTO) {
        log.debug("sending a Error report to all admins");
        userNotificationService.addUniversalReportNotification(
                User.builder().build(),
                universalReportDTO.getReportId(),
                createTitle(universalReportDTO),
                createMessage(universalReportDTO),
                NotificationMessage.ERROR_REPORT
        );
    }

    @Override
    public void addOtherReportNotification(UniversalReportDTO universalReportDTO) {
        log.debug("sending Other report to all admins");
        userNotificationService.addUniversalReportNotification(
                User.builder().build(),
                universalReportDTO.getReportId(),
                createTitle(universalReportDTO),
                createMessage(universalReportDTO),
                NotificationMessage.OTHER_REPORT
        );
    }

    private String createMessage(UniversalReportDTO universalReportDTO){
        return "Report for " + universalReportDTO.getCatagory() + " on "
                + universalReportDTO.getReportDate() + " reportId: " + universalReportDTO.getReportId();
    }

    private String createTitle(UniversalReportDTO universalReportDTO){
        return "new report";
    }
}