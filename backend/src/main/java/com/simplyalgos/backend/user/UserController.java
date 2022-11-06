package com.simplyalgos.backend.user;


import com.simplyalgos.backend.user.dtos.UserDTO;
import com.simplyalgos.backend.user.security.perms.UserReadPermission;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    @GetMapping()
    @PreAuthorize("hasAuthority('users.crud')")
    public ResponseEntity<Set<UserDTO>> getUserList() {
        return new ResponseEntity<>(userService.parseUsers(),HttpStatus.OK);
    }
    @UserReadPermission
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUser(id));
    }
}
