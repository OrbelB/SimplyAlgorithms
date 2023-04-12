package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.exceptions.TokenExpireException;
import com.simplyalgos.backend.security.JpaUserDetailsService;
import com.simplyalgos.backend.user.domains.PasswordResetToken;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.ChangePasswordDTO;
import com.simplyalgos.backend.user.repositories.PasswordResetTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class PasswordResetTokenImp implements PasswordResetTokenService {


    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final JpaUserDetailsService jpaUserDetailsService;


    @Transactional
    public PasswordResetToken createPasswordResetToken(User user) {
        if(passwordResetTokenRepository.existsByUserId(user)){
            passwordResetTokenRepository.deleteByUserId(user);
        }
        log.debug("NOW CREATING THE NEW PASSWORD");
        // create expire date of 15 minutes from now
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 30);
        Date expireDate = cal.getTime();
        return passwordResetTokenRepository.save(PasswordResetToken.builder().userId(user).expireDate(expireDate).build());
    }

    @Override
    public void printAllTokens() {
        List<PasswordResetToken> passlist = passwordResetTokenRepository.findAll();
        for(int i = 0; i < passlist.size(); i++){

        }
    }

    public void validatePasswordResetTokenAndResetPassword(ChangePasswordDTO changePasswordDTO) {
        PasswordResetToken passToken = passwordResetTokenRepository.findById(UUID.fromString(changePasswordDTO.getPasswordToken())).orElseThrow(
        () -> new ElementNotFoundException("token not found"));


        if(!isTokenExpired(passToken)){
            log.debug("RESETTING PASSWORD");
            jpaUserDetailsService.resetUserPassword(passToken.getUserId().getUserId(),changePasswordDTO.getNewPassword());
            passwordResetTokenRepository.deleteById(UUID.fromString(changePasswordDTO.getPasswordToken()));
            return;
        }
        passwordResetTokenRepository.deleteById(passToken.getPasswordResetTokenID());
        throw new TokenExpireException("RESET PASSWORD TOKEN HAS EXPIRED");
    }

    public void deleteExpiredPasswordResetTokens() {
        List<PasswordResetToken> passwordResetTokenList = passwordResetTokenRepository.findAll();
        for(int i = 0; i < passwordResetTokenList.size(); i++){
            if(isTokenExpired(passwordResetTokenList.get(i))){
//                log.info("Deleting token: " + passwordResetTokenList.get(i).getPasswordResetTokenID());
//                log.info("with the date of: " + passwordResetTokenList.get(i).getExpireDate());
                passwordResetTokenRepository.deleteById(passwordResetTokenList.get(i).getPasswordResetTokenID());
            }
            else{
                log.debug("Token not deleted: " + passwordResetTokenList.get(i).getPasswordResetTokenID());
            }
        }
        log.debug("~~~END OF PASSWORD RESET TOKEN EXPIRE DELETION~~~");
    }


    private boolean isTokenExpired(PasswordResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpireDate().before(cal.getTime());
    }

}
