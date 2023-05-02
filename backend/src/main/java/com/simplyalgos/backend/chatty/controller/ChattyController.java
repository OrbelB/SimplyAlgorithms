package com.simplyalgos.backend.chatty.controller;

import com.simplyalgos.backend.chatty.dto.ChattyDTO;
import com.simplyalgos.backend.chatty.service.ChattyService;
import com.simplyalgos.backend.user.security.perms.AdminPermission;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@CrossOrigin(methods = {RequestMethod.GET, RequestMethod.PUT})
@RequestMapping("chatty")
@Slf4j
@RestController
@AdminPermission
public class ChattyController {
    private final ChattyService chattyService;


    @AdminPermission
    @GetMapping(path = "/get-chatty-setting", produces = "application/json")
    public ResponseEntity<?> fetchChatty(@RequestParam String username) {
        return ResponseEntity.ok(chattyService.getChattyProfile());
    }

    @AdminPermission
    @PutMapping(path = "/update", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateChattyProfile(@RequestBody ChattyDTO chattySettings) {

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(chattyService.updateProfile(chattySettings));
    }
}
