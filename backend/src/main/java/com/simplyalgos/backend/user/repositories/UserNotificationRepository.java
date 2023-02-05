package com.simplyalgos.backend.user.repositories;

import com.simplyalgos.backend.user.domains.UserNotification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserNotificationRepository extends JpaRepository<UserNotification, UUID> {

    Page<UserNotification> findAllByUserNotification_UserId(UUID userId, Pageable pageable);
    Set<UserNotification> findAllByUserNotification_UserId(UUID userId);

    Optional<UserNotification> findByReferenceIdAndUserNotification_UserId(UUID referenceId, UUID userId);
    boolean existsByReferenceIdAndUserNotification_UserId(UUID referenceId, UUID userId);
}
