package com.simplyalgos.backend.scheduling;

import com.simplyalgos.backend.user.domains.PasswordResetToken;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.repositories.PasswordResetTokenRepository;
import com.simplyalgos.backend.user.services.PasswordResetTokenImp;
import com.simplyalgos.backend.user.services.PasswordResetTokenService;
import jakarta.persistence.Column;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.config.ScheduledTask;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

@Component
@Data
public class ScheduleTask {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTask.class);

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    private final PasswordResetTokenService passwordResetTokenService;

    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        log.info("The time is now {~~~~}", dateFormat.format(new Date()));
        passwordResetTokenService.deleteExpiredPasswordResetTokens();
    }

}
