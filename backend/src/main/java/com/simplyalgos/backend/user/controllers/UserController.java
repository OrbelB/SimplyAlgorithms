package com.simplyalgos.backend.user.controllers;


import com.simplyalgos.backend.security.JpaUserDetailsService;
import com.simplyalgos.backend.user.dtos.NotificationRemoval;
import com.simplyalgos.backend.user.dtos.RoleChangeForm;
import com.simplyalgos.backend.user.dtos.UserDataPostDTO;
import com.simplyalgos.backend.user.dtos.UserPreferencesDTO;
import com.simplyalgos.backend.user.repositories.projections.UserInformationOnly;
import com.simplyalgos.backend.user.security.perms.*;
import com.simplyalgos.backend.user.services.DashboardService;
import com.simplyalgos.backend.user.services.UserNotificationService;
import com.simplyalgos.backend.user.services.UserPreferenceService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.utils.StringUtils;
import com.simplyalgos.backend.web.dtos.UpdatePassword;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public ResponseEntity<ObjectPagedList<UserInformationOnly>> getUserList(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(userService.listAllUsers(PageRequest.of(page, size)));
    }

    @UserReadPermission
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }

    @UserUpdatePermission
    @PutMapping(path = "/update", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> update(@RequestBody UserDataPostDTO userDTO) {
        log.debug("user id is " + userDTO.getUserId());
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
    @GetMapping(path = "/notifications", produces = "application/json")
    public ResponseEntity<?> fetchNotifications(@RequestParam(name="userId") UUID userId,
                                                @RequestParam(name = "page", defaultValue = "0") int page,
                                                @RequestParam(name = "size", defaultValue = "10") int size,
                                                @RequestParam(name = "sortBy", required = false) String sortBy,
                                                @RequestParam(name = "title", required = false) String title
    ) {
        if (StringUtils.isNotNullAndEmptyOrBlank(sortBy)) {
            return ResponseEntity.ok(
                    dashboardService.
                            displayNotifications(userId,
                                    PageRequest.of(page, size, Sort.by(sortBy).ascending())
                            )
            );
        }
        return ResponseEntity.ok(dashboardService.displayNotifications(userId, PageRequest.of(page, size)));
    }

    @UserReadPermission
    @GetMapping(path = "/dayStreak/{userId}", produces = "application/json")
    public ResponseEntity<?> fetchDashboardInformation(@PathVariable UUID userId) {
        return ResponseEntity.ok(dashboardService.displayUserDayStreak(userId));
    }


    @PutMapping(path = "/update-role", produces = "application/json")
    @PreAuthorize("hasAuthority('users.crud')")
    public ResponseEntity<?> updateRole(@RequestParam(name = "usernameOrId", required = false) String usernameOrId,
                                        @RequestParam(name = "role") String role) {
        return ResponseEntity.accepted().body(userService.changeUserRole(usernameOrId, role));
    }

    @UserRemoveNotification
    @DeleteMapping(path = "/delete-notification", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> deleteNotification(@RequestBody NotificationRemoval notificationRemoval) {
        return ResponseEntity.ok().body(userNotificationService.removeNotification(notificationRemoval.notificationId()));
    }

    @GetMapping(path = "available", produces = "application/json")
    public ResponseEntity<Map<String, Boolean>> availableUsername(@RequestParam(name = "username", required = false) String username,
                                                                  @RequestParam(name = "email", required = false) String email) {
        Map<String, Boolean> map = new HashMap<>();
        if (StringUtils.isNotNullAndEmptyOrBlank(email))
            map.put("email", userService.emailIsAvailable(email));
        else if (StringUtils.isNotNullAndEmptyOrBlank(username))
            map.put("username", userService.usernameIsAvailable(username));
        else
            throw new NoSuchElementException("No username or email provided");
        return ResponseEntity.ok().body(map);
    }

//  add the number of days to lock the acocunt
    @PutMapping(path = "/lock-account", produces = "application/json")
    @PreAuthorize("hasAuthority('users.crud')")
//    @AdminPermission
    public ResponseEntity<?> lockAccount(@RequestParam(name = "usernameOrId") String usernameOrId,
                                         @RequestParam(name = "accountLockedSwitch") boolean accountLockedSwitch,
                                         @RequestParam(name = "daysToLock" , defaultValue = "30", required = false) int daysToLock) {
//        log.debug("Locking account " + usernameOrId + " for " + daysToLock + " days");
        return ResponseEntity.accepted().body(userService.LockUserAccount(usernameOrId, daysToLock, accountLockedSwitch));
    }

    @PutMapping(path = "/request-role")
    @PreAuthorize("@customAuthManager.userIdMatches(authentication,#roleChangeForm.userId)")
    public ResponseEntity<?> requestRole(@RequestBody RoleChangeForm roleChangeForm) {
        userService.requestRoleChange(roleChangeForm);
        return ResponseEntity.noContent().build();
    }

}
