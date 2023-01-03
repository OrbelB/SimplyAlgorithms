package com.simplyalgos.backend.user.controllers;


import com.simplyalgos.backend.security.JpaUserDetailsService;
import com.simplyalgos.backend.storage.StorageService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.user.dtos.UserDTO;
import com.simplyalgos.backend.user.dtos.UserDataPostDTO;
import com.simplyalgos.backend.user.security.perms.UserDeletePermission;
import com.simplyalgos.backend.user.security.perms.UserReadPermission;
import com.simplyalgos.backend.user.security.perms.UserUpdatePasswordPermission;
import com.simplyalgos.backend.user.security.perms.UserUpdatePermission;
import com.simplyalgos.backend.web.dtos.UpdatePassword;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.MessageFormat;
import java.util.Set;
import java.util.UUID;


@RequiredArgsConstructor
@CrossOrigin()
@RequestMapping("/users")
@Slf4j
@RestController
public class UserController {
    private final UserService userService;
    private final JpaUserDetailsService jpaUserDetailsService;

    private final StorageService storageService;

    @GetMapping()
    @PreAuthorize("hasAuthority('users.crud')")
    public ResponseEntity<Set<UserDTO>> getUserList() {
        return new ResponseEntity<>(userService.parseUsers(), HttpStatus.OK);
    }

    @UserReadPermission
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUser(id));
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
        log.info(MessageFormat.format("does this message runs {0}", updatePassword.newPassword()));
        log.debug(MessageFormat.format("this is the userId {0}", updatePassword.userId().toString()));
        return ResponseEntity.accepted().body(jpaUserDetailsService.updatePassword(updatePassword));
    }


    @UserDeletePermission
    @DeleteMapping(path = "/delete", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@RequestParam(name = "userId") UUID userId) {
        return ResponseEntity.ok().body(userService.removeUser(userId));
    }


    @Deprecated
    @PostMapping(path = "/upload/image")
    public ResponseEntity<?> uploadFile(@RequestParam(value = "file") MultipartFile file) {
        return ResponseEntity.accepted().body(storageService.uploadImageFile(file));
    }


}
