package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.exceptions.TokenExpireException;
import com.simplyalgos.backend.security.JpaUserDetailsService;
import com.simplyalgos.backend.user.domains.PasswordResetToken;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.ChangePasswordDTO;
import com.simplyalgos.backend.user.repositories.PasswordResetTokenRepository;
import jakarta.persistence.TemporalType;
import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
public class PasswordResetTokenImp implements PasswordResetTokenService {


    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final JpaUserDetailsService jpaUserDetailsService;


    @Transactional
    public PasswordResetToken createPasswordResetToken(User user) {
        UUID userID = user.getUserId();
        if(passwordResetTokenRepository.existsByUserId(user)){
            log.info("PASSWORD RESET TOKEN FOR USER: " + user.getUsername() + " PRESENT, DELETING AND CREATING A NEW TOKEN");

            PasswordResetToken passwordResetTokenold = passwordResetTokenRepository.getPasswordResetTokenByUserId(user);
            passwordResetTokenRepository.deleteById(passwordResetTokenold.getPasswordResetTokenID());

        }
        log.info("NOW CREATING THE NEW PASSWORD");
        UUID resetPasswordToken = UUID.randomUUID();
        PasswordResetToken passwordResetToken = new PasswordResetToken(user, resetPasswordToken);
        passwordResetTokenRepository.saveAndFlush(passwordResetToken);
        return passwordResetToken;
    }


    public void validatePasswordResetTokenAndResetPassword(ChangePasswordDTO changePasswordDTO) {
        PasswordResetToken passToken = passwordResetTokenRepository.findById(UUID.fromString(changePasswordDTO.getPasswordToken())).orElseThrow(
        () -> new ElementNotFoundException("token not found"));


        if(!isTokenExpired(passToken)){
            log.info("RESETTING PASSWORD");
            jpaUserDetailsService.resetUserPassword(passToken.getUserId().getUserId(),changePasswordDTO.getNewPassword());
            passwordResetTokenRepository.deleteById(UUID.fromString(changePasswordDTO.getPasswordToken()));
        }
        passwordResetTokenRepository.deleteById(passToken.getPasswordResetTokenID());
        throw new TokenExpireException("RESET PASSWORD TOKEN HAS EXPIRED");
    }

    public void deleteExpiredPasswordResetTokens() {
        final Calendar cal = Calendar.getInstance();
//        expireDate

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//        String date = formatter.format(new Date());
        String date = "2023-02-02";
        passwordResetTokenRepository.deleteAllExpiredTokens(date);
    }


    private boolean isTokenExpired(PasswordResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpireDate().before(cal.getTime());
    }

}
