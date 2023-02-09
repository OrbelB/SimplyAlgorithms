package com.simplyalgos.backend.user.repositories;

import com.simplyalgos.backend.user.domains.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserHistoryRepository extends JpaRepository<UserHistory, UUID> {

    DaysStreakOnly findByUserId(UUID userId);

}
