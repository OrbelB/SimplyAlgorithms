package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.repositories.projection.ForumInformation;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.DashboardDTO;

import java.util.UUID;

public interface DashboardService {

    DashboardDTO displayNotifications(UUID userId);

    void addTopicNotification(Topic fullTopicDTO, User userToNotified);

    void addForumNotification(ForumInformation forumDTO, User userToNotified);

    void addPasswordResetNotification(User userToNotified);

    void addAccountChangesNotification(User userToNotified);

    void addSpecialSystemUpdateNotification(User userToNotified);


}
