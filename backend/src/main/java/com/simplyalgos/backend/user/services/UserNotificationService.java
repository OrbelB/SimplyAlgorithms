package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.web.pagination.ObjectPagedList;

import java.util.UUID;

public interface UserNotificationService {
    void addNotification(UUID pageId);
    ObjectPagedList<?> getNotifications();

}
