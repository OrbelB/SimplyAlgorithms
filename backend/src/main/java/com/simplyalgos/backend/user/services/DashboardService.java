package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.page.dtos.FullForumDTO;
import com.simplyalgos.backend.page.dtos.FullTopicDTO;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.DashboardDTO;

import java.util.UUID;

public interface DashboardService {

    DashboardDTO displayNotifications(UUID userId);

    void addTopicNotification(FullTopicDTO fullTopicDTO, User userToNotified);

    void addForumNotification(FullForumDTO forumDTO, User userToNotified);

    void addPasswordResetNotification(User userToNotified);

    void addAccountChangesNotification(User userToNotified);

    void addSpecialSystemUpdateNotification(User userToNotified);


}
