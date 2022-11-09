package com.simplyalgos.backend.user.security;


import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;

@Slf4j
@Component
public class CustomAuthManager {

    public boolean userIdMatches(Authentication authentication, String userId) {
        log.debug(MessageFormat.format("this is the owner of the comment {0}", userId));
        return authentication.getName().equals(userId);
    }
}
