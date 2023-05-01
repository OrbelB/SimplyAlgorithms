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

    @Scheduled(cron = "0 */15 * * * *")
    public void ScheduledServiceCall() {
        log.debug("CHECKING FOR ALL EXPIRED PASSWORD RESET TOKENS");
        int t = 0;
        for(int i = 0; i < 10; i++){
            i = i + 1 + i;
            t = i;
        }
        log.info("THE I IS " + t);
//        passwordResetTokenService.printAllTokens();
        chattyService.beginChattyForumResponse();
        passwordResetTokenService.deleteExpiredPasswordResetTokens();
    }
}
