package com.simplyalgos.backend.user.controllers;


import com.simplyalgos.backend.security.JpaUserDetailsService;
import com.simplyalgos.backend.user.dtos.NotificationRemoval;
import com.simplyalgos.backend.user.dtos.UserDTO;
import com.simplyalgos.backend.user.dtos.UserDataPostDTO;
import com.simplyalgos.backend.user.dtos.UserPreferencesDTO;
import com.simplyalgos.backend.user.security.perms.*;
import com.simplyalgos.backend.user.services.DashboardService;
import com.simplyalgos.backend.user.services.UserNotificationService;
import com.simplyalgos.backend.user.services.UserPreferenceService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.utils.StringUtils;
import com.simplyalgos.backend.web.dtos.UpdatePassword;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.*;


@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/users")
@Slf4j
@RestController
public class UserController {
    private final UserService userService;
    private final JpaUserDetailsService jpaUserDetailsService;

    private final UserPreferenceService userPreferenceService;

    private final UserNotificationService userNotificationService;

    private final DashboardService dashboardService;

    @GetMapping
    @PreAuthorize("hasAuthority('users.crud')")
    public ResponseEntity<Set<UserDTO>> getUserList() {
        return ResponseEntity.ok(userService.parseUsers());
    }

    @UserReadPermission
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }

    @UserUpdatePermission
    @PutMapping(path = "/update", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> update(@RequestBody UserDataPostDTO userDTO) {
        log.info("user id is ", userDTO.getUserId());
        return ResponseEntity.accepted().body(userService.updateUser(userDTO));
    }


    @UserUpdatePasswordPermission
    @PutMapping(path = "/update-password", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePassword updatePassword) {
        log.debug(MessageFormat.format("this is the userId {0}", updatePassword.userId().toString()));
        return ResponseEntity.accepted().body(jpaUserDetailsService.updatePassword(updatePassword));
    }


    @UserDeletePermission
    @DeleteMapping(path = "/delete", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@RequestParam(name = "userId") UUID userId) {
        return ResponseEntity.ok().body(userService.removeUser(userId));
    }


    @UserPreferencesUpdatePermission
    @PutMapping(path = "/update-preferences", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> updatePreferences(@RequestBody UserPreferencesDTO userPreferencesDTO) {
        return ResponseEntity.accepted().body(userPreferenceService.updateNotificationPreference(userPreferencesDTO));

    }

    @UserReadPermission
    @GetMapping(path = "/dashboard/{userId}", produces = "application/json")
    public ResponseEntity<?> fetchDashboardInformation(@PathVariable UUID userId) {
        return ResponseEntity.ok(dashboardService.displayNotifications(userId));
    }

    @UserRemoveNotification
    @DeleteMapping(path = "/delete-notification", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> deleteNotification(@RequestBody NotificationRemoval  notificationRemoval) {
        return ResponseEntity.ok().body(userNotificationService.removeNotification(notificationRemoval.notificationId()));
    }

    @GetMapping(path = "available", produces = "application/json")
    public ResponseEntity<Map<String, Boolean>> availableUsername(@RequestParam(name = "username", required = false) String username,
                                               @RequestParam(name = "email", required = false ) String email) {
        Map<String, Boolean> map = new HashMap<>();
        if(StringUtils.isNotNullAndEmptyOrBlank(email))
            map.put("email", userService.emailIsAvailable(email));
        else if(StringUtils.isNotNullAndEmptyOrBlank(username))
           map.put("username" , userService.usernameIsAvailable(username));
        else
            throw new NoSuchElementException("No username or email provided");
        return ResponseEntity.ok().body(map);
    }

}
