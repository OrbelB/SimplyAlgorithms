package com.simplyalgos.backend.user.repositories;

import com.simplyalgos.backend.user.domains.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface UserHistoryRepository extends JpaRepository<UserHistory, UUID> {


    @Query(nativeQuery = true, value = "SELECT uh.day_streak FROM user_history AS uh WHERE uh.dayStreak = :user_id")
    short getDayStreakByUserId(@Param("user_id")UUID userId);
}
