package com.simplyalgos.backend.user.repositories.projections;

import org.springframework.beans.factory.annotation.Value;

public interface DaysStreakOnly {

    @Value("#{target.dayStreak}")
    short getDayStreak();
}
