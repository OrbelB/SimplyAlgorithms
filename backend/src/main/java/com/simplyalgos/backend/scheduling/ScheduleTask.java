package com.simplyalgos.backend.scheduling;

import com.simplyalgos.backend.chatty.service.ChattyService;
import com.simplyalgos.backend.user.services.PasswordResetTokenService;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.config.ScheduledTask;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;

@Component // runs whenever
@Data
public class ScheduleTask {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTask.class);

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    private final PasswordResetTokenService passwordResetTokenService;

    private final ChattyService chattyService;

    @Scheduled(cron = "0 0 0/6 * * *")
    public void ScheduledServiceCall() {
//        log.debug("CHECKING FOR ALL EXPIRED PASSWORD RESET TOKENS");
//        passwordResetTokenService.printAllTokens();
        passwordResetTokenService.deleteExpiredPasswordResetTokens();
    }

    @Scheduled(cron = "0 0/15 * * * *")
//    @Scheduled(fixedDelay = 10000, initialDelay = 60000)
    public void chattySchedule() {
        chattyService.beginChattyForumResponse();
    }
}
