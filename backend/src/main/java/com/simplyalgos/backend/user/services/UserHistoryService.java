package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.User;

import java.util.UUID;

public interface UserHistoryService {


    short getUserStreakDays(UUID userId);

    void logUserLogging(User userId);


}
