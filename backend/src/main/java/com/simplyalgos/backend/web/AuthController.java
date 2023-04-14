package com.simplyalgos.backend.web;

import com.simplyalgos.backend.exceptions.CustomAccountLockedException;
import com.simplyalgos.backend.exceptions.UserNotAuthorizedException;
import com.simplyalgos.backend.user.dtos.ChangePasswordDTO;
import com.simplyalgos.backend.user.dtos.GetUsernameDTO;
import com.simplyalgos.backend.user.dtos.PasswordResetRequestDTO;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.dtos.LoginDTO;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import com.simplyalgos.backend.web.dtos.TokenDTO;
import com.simplyalgos.backend.web.services.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;


//endpoints for registering, logging in and updating tokens
@Slf4j
@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/public")
public class AuthController {
    private final AuthService authService;

    private final UserService userService;



    @PostMapping(path = "/register", consumes = "application/json")
    public ResponseEntity<?> register(@RequestBody SignupDTO signupDTO) throws Exception {
        return ResponseEntity.ok(authService.register(signupDTO));
    }

    @PostMapping(path = "/login", consumes = "application/json")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO loginDTO) {

        if (userService.isUserLocked(loginDTO.username())) {
//            log.debug("account Lock flagged");
            if (userService.accountLockExpired(loginDTO.username())){
//                log.debug("account Lock expired now logging in user");
                return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION).body(authService.login(loginDTO));
            }
            throw new CustomAccountLockedException(MessageFormat
                    .format("User: {0} account is locked, please check email for lock expire date", loginDTO.username()));
        }
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION).body(authService.login(loginDTO));

    }

    @PostMapping("/token")
    public ResponseEntity<?> token(@RequestBody TokenDTO tokenDTO) {
        return ResponseEntity.ok(authService.refreshToken(tokenDTO));
    }

    @PostMapping("/resetPasswordRequest")
    public ResponseEntity<?> resetPasswordRequest(@RequestBody PasswordResetRequestDTO passwordResetRequestDTO) {
        authService.resetPassword(passwordResetRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        authService.changePassword(changePasswordDTO);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/getUsername")
    public ResponseEntity<?> getUsername(@RequestBody GetUsernameDTO getUsernameDTO) {
        return ResponseEntity.ok(authService.getUsername(getUsernameDTO, boolean.class));
    }
}