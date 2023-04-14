package com.simplyalgos.backend.scheduling;

import com.simplyalgos.backend.user.services.PasswordResetTokenService;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.config.ScheduledTask;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;

@Component
@Data
public class ScheduleTask {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTask.class);

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    private final PasswordResetTokenService passwordResetTokenService;

    @Scheduled(cron  = "0 0 10 * * *")
    public void reportCurrentTime() {
        log.debug("CHECKING FOR ALL EXPIRED PASSWORD RESET TOKENS");
//        passwordResetTokenService.printAllTokens();
        passwordResetTokenService.deleteExpiredPasswordResetTokens();
    }
}
