package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.domains.UserHistory;
import com.simplyalgos.backend.user.mappers.UserHistoryMapper;
import com.simplyalgos.backend.user.repositories.UserHistoryRepository;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserHistoryServiceImpl implements UserHistoryService {

    private final UserHistoryRepository userHistoryRepository;

    private final UserHistoryMapper userHistoryMapper;

    @Override
    public short getUserStreakDays(UUID userId) {
        return userHistoryRepository.findByUserId(userId).getDayStreak();
    }

    private void updateStreakDays(@NonNull UserHistory userHistory, @NonNull LocalDate currentDate) {
        LocalDate lastLogin = userHistory.getDayLoggedIn().toLocalDate();
        // check if user already logged in today
        if (lastLogin.equals(currentDate)) {
            log.debug("user already logged in this day");
            return;
        }

        if (lastLogin.plusDays(1).equals(currentDate)) { //if user logged in yesterday then add one to it
            userHistory.setDayStreak((short) (userHistory.getDayStreak() + 1));
        } else { // restart the days
            userHistory.setDayStreak((short) 1);
        }
        userHistory.setDayLoggedIn(Date.valueOf(currentDate));

    }

    @Override
    public void logUserLogging(User user) {
        LocalDate currentDate = LocalDate.now();
        UserHistory userHistory = userHistoryRepository.findById(user.getUserId())
                .orElseGet(() ->
                        userHistoryMapper
                                .createUserHistory(
                                        Date.valueOf(currentDate), user.getUserId(),
                                        (short) 1, user)
                );
        updateStreakDays(userHistory, currentDate);
        userHistoryRepository.saveAndFlush(userHistory);
    }
}
