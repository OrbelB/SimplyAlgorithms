package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.repositories.projection.ForumInformation;
import com.simplyalgos.backend.universalReport.dto.UniversalReportDTO;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.DashboardDTO;

import java.util.UUID;

public interface DashboardService {

    /**
     * @param userId the id of the user currently logged in to the system and requesting the
     *               dashboard information
     * @return DashboardDTO which contains the user's notifications and days
     * user has been logged in consecutively  and the id of the user
     */
    DashboardDTO displayNotifications(UUID userId);

//    ----------------------------------------------------------
    @Deprecated
    void addReportResolvedNotification(User userToNotify, UniversalReportDTO universalReportDTO);

//        Will notify to roles that have admins
    @Deprecated
    void addProfanityReportNotification(UniversalReportDTO universalReportDTO);

    /**
     * @param fullTopicDTO   the topic that the user has commented on
     * @param userToNotified user to be notified of the comment which is the creator of
     *                       the message another user replied to
     * @implSpec  notifies the user that someone has replied to a comment they have made in a topic
     */
    void addTopicNotification(Topic fullTopicDTO, User userToNotified);

    /**
     * @param forumDTO       the forum that the user has commented on
     * @param userToNotified user to be notified of the comment a user made to the forum they created
     * @implSpec notifies the user that someone has commented out in a forum they have made
     */
    void addForumNotification(ForumInformation forumDTO, User userToNotified);

    /**
     * @param userToNotified user to be notified of the request
     * @param username       of the user who requested the role change
     * @implSpec notifies the user that someone has requested a role change
     */
    void addAdminNotification(User userToNotified, String username);

    /**
     * @param userToNotified user to be notified of the account change
     * @implSpec notifies the user that their password has been reset
     */
    void addPasswordResetNotification(User userToNotified);

    /**
     * @param userToNotified user to be notified of the request
     * @implSpec notifies the user that their account has been changed
     */
    void addAccountChangesNotification(User userToNotified);

    /**
     * @param userToNotified user to be notified of the request
     * @implSpec notifies the user that their role has been changed
     */
    void addRoleChangeNotification(User userToNotified, String requester);

    /**
     * @param userToNotified user to be notified of the request
     * @implSpec notifies the user that there is a new system update
     */
    void addSpecialSystemUpdateNotification(User userToNotified);


    @Deprecated
    void addIncorrectInformationReportNotification(UniversalReportDTO universalReportDTO);

    @Deprecated
    void addErrorReportNotification(UniversalReportDTO universalReportDTO);

    @Deprecated
    void addOtherReportNotification(UniversalReportDTO universalReportDTO);
}
