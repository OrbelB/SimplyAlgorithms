package com.simplyalgos.backend.user.repositories;

import com.simplyalgos.backend.user.domains.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserNotificationRepository extends JpaRepository<UserNotification, UUID> {
}
