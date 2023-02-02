package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.domains.UserHistory;
import com.simplyalgos.backend.user.repositories.UserHistoryRepository;

import io.swagger.v3.core.util.Json;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import org.springframework.stereotype.Service;


import java.sql.Date;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserHistoryServiceImpl implements UserHistoryService {
    private final UserHistoryRepository userHistoryRepository;

    @Override
    public short getUserStreakDays(UUID userId) {
        return userHistoryRepository.getDayStreakByUserId(userId);
    }

    private void updateStreakDays(@NonNull UserHistory userHistory , LocalDate currentDate) {
        LocalDate lastLogin = userHistory.getDayLoggedIn().toLocalDate();
        if(lastLogin.equals(currentDate)){
            log.info("user already logged in this day");
            return;
        }
        if (lastLogin.plusDays(1).equals(currentDate)) { //if user logged in yesterday then add one to it
            userHistory.setDayStreak((short) (userHistory.getDayStreak() + 1));
        } else { // restart the days
            userHistory.setDayStreak((short) 1);
        }
        userHistory.setDayLoggedIn(Date.valueOf(currentDate));
        log.info(MessageFormat.format("updating the user state for current {0} ", Json.pretty(userHistory)));
    }

    @Override
    public void logUserLogging(User user) {
        Optional<UserHistory> optionalUserHistory = userHistoryRepository.findById(user.getUserId());
        LocalDate currentDate = LocalDate.now();
        if (optionalUserHistory.isPresent()) {
            log.info(MessageFormat.format("updating the current date for user {0}", Json.pretty(optionalUserHistory.get())));
            updateStreakDays(optionalUserHistory.get(), currentDate);
            return;
        }
        log.debug(MessageFormat.format("creating new instance for user history with user being {0}", user.getUserId()));
        userHistoryRepository.saveAndFlush(UserHistory
                .builder()
                .dayLoggedIn(Date.valueOf(currentDate))
                .userId(user.getUserId())
                .dayStreak((short) 1)
                .userReference(user)
                .build());
    }
}
