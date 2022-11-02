package com.simplyalgos.backend.user;


import com.simplyalgos.backend.user.dtos.UserDto;
import com.simplyalgos.backend.user.security.perms.UserReadPermission;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;


@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    @GetMapping()
    @PreAuthorize("hasAuthority('users.crud')")
    public ResponseEntity<Set<UserDto>> getUserList() {
        return new ResponseEntity<>(userService.parseUsers(),HttpStatus.OK);
    }
    @UserReadPermission
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUser(id));
    }
}
