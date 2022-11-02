package com.simplyalgos.backend.user.security;


import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CustomAuthManager {
    public boolean userIdMatches(Authentication authentication, String userId) {
        log.debug(authentication.getName());
        return authentication.getName().equals(userId);
    }
}
