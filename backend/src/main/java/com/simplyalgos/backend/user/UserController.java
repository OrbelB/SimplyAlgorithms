package com.simplyalgos.backend.user;


import com.simplyalgos.backend.user.dtos.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;


@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<Set<UserDto>> getUserList() {
        return new ResponseEntity<>(userService.parseUsers(),HttpStatus.OK);
    }

}
