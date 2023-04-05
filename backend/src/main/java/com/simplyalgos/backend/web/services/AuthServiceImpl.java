package com.simplyalgos.backend.web.services;

import com.simplyalgos.backend.emailing.services.EmailService;
import com.simplyalgos.backend.exceptions.CustomAccountLockedException;
import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.exceptions.UserNotAuthorizedException;
import com.simplyalgos.backend.security.JpaUserDetailsService;
import com.simplyalgos.backend.security.TokenGenerator;
import com.simplyalgos.backend.user.domains.PasswordResetToken;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.ChangePasswordDTO;
import com.simplyalgos.backend.user.dtos.GetUsernameDTO;
import com.simplyalgos.backend.user.dtos.PasswordResetRequestDTO;
import com.simplyalgos.backend.user.enums.ResetPasswordRequestEmailValues;
import com.simplyalgos.backend.user.services.PasswordResetTokenService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.dtos.LoginDTO;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import com.simplyalgos.backend.web.dtos.TokenDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    private final JpaUserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final TokenGenerator tokenGenerator;
    private JwtAuthenticationProvider refreshTokenAuthProvider;

    private final UserService userService;

    private final EmailService emailService;

    private final PasswordResetTokenService passwordResetTokenService;


    @Autowired
    @Qualifier("jwtRefreshTokenAuthProvider")
    private void setJwtAuthenticationProvider(JwtAuthenticationProvider jwtAuthenticationProvider) {
        this.refreshTokenAuthProvider = jwtAuthenticationProvider;
    }

    @Override
    public TokenDTO register(SignupDTO signupDTO) {
        userDetailsService.createUser(signupDTO);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signupDTO.getUsername(), signupDTO.getPassword()));
        return tokenGenerator.createToken(authentication);
    }

    @Override
    public TokenDTO login(LoginDTO loginDTO) {
        log.debug("this is the username: " + loginDTO.username());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.username(), loginDTO.password())
            );
            return tokenGenerator.createToken(authentication);
        } catch (Exception exception) {
            if(exception instanceof org.springframework.security.authentication.LockedException){
                String message = "The account is locked, please contact the administrator!";
                throw new CustomAccountLockedException(message);
            }else {
                String message = "Username or password is incorrect";
                log.error("username not authorized " + exception);
                throw new UserNotAuthorizedException(message);
            }
        }
    }

    @Override
    public TokenDTO refreshToken(TokenDTO tokenDTO) {
        try {
            Authentication authentication = refreshTokenAuthProvider
                    .authenticate(new BearerTokenAuthenticationToken(tokenDTO.getRefreshToken()));

            log.info("authentication has this data " + authentication.getPrincipal().getClass());
            if (userDetailsService.IsUserAccountNonLockedAndAuthenticated(authentication.getName()))
                return tokenGenerator.createToken(authentication);
            throw new UserNotAuthorizedException("User is not authorized");
        } catch (Exception ex) {
            log.error("the error is the following " + ex);
            throw new ElementNotFoundException("User not found");
        }
    }

    @Override
    public void resetPassword(PasswordResetRequestDTO passwordResetRequestDTO) {
        User user = userService.userUserNameExists(passwordResetRequestDTO.getUsername());
        // String tempEmail = "djefferson545@gmail.com";
        PasswordResetToken passwordResetToken = passwordResetTokenService.createPasswordResetToken(user);
        log.info("A NEW RESET PASSWORD TOKEN HAS BEEN CREATED FOR USER " + user.getUsername()
                + " THE TOKEN IS: " + passwordResetToken.getPasswordResetTokenID());

        String passwordResetLinkLocal = "http://localhost:3000/passwordReset?token=" + passwordResetToken.getPasswordResetTokenID().toString();
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(ResetPasswordRequestEmailValues.FROM.label);
        simpleMailMessage.setSubject(ResetPasswordRequestEmailValues.SUBJECT.label);
        simpleMailMessage.setText(ResetPasswordRequestEmailValues.BODY.label + " " + user.getEmail() + "\n\n\n CLICK HERE TO RESET PASSWORD: \n" +
                passwordResetLinkLocal);
        simpleMailMessage.setTo(user.getEmail());
        log.info(user.getEmail() + " USER EMAIL");
        emailService.sendEmail(simpleMailMessage);
    }

    @Override
    public void changePassword(ChangePasswordDTO changePasswordDTO) {
        passwordResetTokenService.validatePasswordResetTokenAndResetPassword(changePasswordDTO);
    }

    @Override
    public <T> T getUsername(GetUsernameDTO getUsernameDTO, Class<T> tClass) {
        boolean found = userService.getUsername(getUsernameDTO);
        log.info("GOT EMAIL: " + getUsernameDTO.getEmail());
        return tClass.cast(found);
    }
}
