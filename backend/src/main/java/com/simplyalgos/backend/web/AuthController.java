package com.simplyalgos.backend.web;

import com.simplyalgos.backend.emailing.services.EmailService;
import com.simplyalgos.backend.security.JpaUserDetailsService;
import com.simplyalgos.backend.security.TokenGenerator;
import com.simplyalgos.backend.user.domains.PasswordResetToken;
import com.simplyalgos.backend.user.enums.ResetPasswordRequestEmailValues;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.ChangePasswordDTO;
import com.simplyalgos.backend.user.dtos.GetUsernameDTO;
import com.simplyalgos.backend.user.dtos.PasswordResetRequestDTO;
import com.simplyalgos.backend.user.services.PasswordResetTokenService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.dtos.LoginDTO;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import com.simplyalgos.backend.web.dtos.TokenDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;

import org.springframework.web.bind.annotation.*;


//endpoints for registering, logging in and updating tokens
@Slf4j
@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/public")
public class AuthController {
    private final JpaUserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final TokenGenerator tokenGenerator;
    private JwtAuthenticationProvider refreshTokenAuthProvider;

    private final UserService userService;

    private final EmailService emailService;

    private final PasswordResetTokenService passwordResetTokenService;


    @Autowired
    @Qualifier("jwtRefreshTokenAuthProvider")
    private void setJwtAuthenticationProvider(JwtAuthenticationProvider jwtAuthenticationProvider){
        this.refreshTokenAuthProvider = jwtAuthenticationProvider;
    }


    @PostMapping(path = "/register", consumes = "application/json")
    public ResponseEntity<?> register(@RequestBody SignupDTO signupDTO) throws Exception {
        userDetailsService.createUser(signupDTO);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signupDTO.getUsername(), signupDTO.getPassword()));
        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @PostMapping(path = "/login", consumes = "application/json")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO loginDTO) {
        log.debug("this is the username: " + loginDTO.username());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.username(), loginDTO.password())
            );
            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION).body(tokenGenerator.createToken(authentication));
        } catch (Exception exception) {
            log.error("username not authorized " + exception);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/token")
    public ResponseEntity<?> token(@RequestBody TokenDTO tokenDTO) {
        try {
            Authentication authentication = refreshTokenAuthProvider
                    .authenticate(new BearerTokenAuthenticationToken(tokenDTO.getRefreshToken()));
            //Jwt jwt = (Jwt) authentication.getCredentials();
            log.info("authentication has this data " + authentication.getPrincipal().getClass());
            return userDetailsService.IsUserAccountNonLockedAndAuthenticated(authentication.getName()) ?
                    ResponseEntity.ok(tokenGenerator.createToken(authentication)) :
                    ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception ex) {
            log.error("the error is the following " + ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @PostMapping("/resetPasswordRequest")
    public  ResponseEntity<?> resetPasswordRequest(@RequestBody PasswordResetRequestDTO passwordResetRequestDTO){


        User user = userService.userUserNameExists(passwordResetRequestDTO.getUsername().toString());
        String tempEmail = "bobsb5038@gmail.com";

        PasswordResetToken passwordResetToken = passwordResetTokenService.createPasswordResetToken(user);

        log.info("A NEW RESET PASSWORD TOKEN HAS BEEN CREATED FOR USER " + user.getUsername()
                + " THE TOKEN IS: " + passwordResetToken.getPasswordResetTokenID());


        String passwordResetLinkLocal = "http://localhost:3000/passwordReset?token="+passwordResetToken.getPasswordResetTokenID().toString();
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(ResetPasswordRequestEmailValues.FROM.label);
        simpleMailMessage.setSubject(ResetPasswordRequestEmailValues.SUBJECT.label);
        simpleMailMessage.setText(ResetPasswordRequestEmailValues.BODY.label + " " + user.getEmail() + "\n\n\n CLICK HERE TO RESET PASSWORD: \n" +
                passwordResetLinkLocal);

        simpleMailMessage.setTo(tempEmail);
        log.info(user.getEmail() + " USER EMAIL");

        emailService.sendEmail(simpleMailMessage);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO){
        passwordResetTokenService.validatePasswordResetTokenAndResetPassword(changePasswordDTO);

        return ResponseEntity.ok("~");

    }

    @PostMapping("/getUsername")
    public  ResponseEntity<?> getUsername(@RequestBody GetUsernameDTO getUsernameDTO){
        boolean found = userService.getUsername(getUsernameDTO);
        log.info("GOT EMAIL: " + getUsernameDTO.getEmail());
        return ResponseEntity.ok(found);
    }
}