package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.PasswordResetToken;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.ChangePasswordDTO;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.UUID;
@EnableScheduling
public interface PasswordResetTokenService {
//    boolean tokenExists(UUID passwordResetToken);
    PasswordResetToken createPasswordResetToken(User user);

    void validatePasswordResetTokenAndResetPassword(ChangePasswordDTO changePasswordDTO);

    void deleteExpiredPasswordResetTokens();

}
