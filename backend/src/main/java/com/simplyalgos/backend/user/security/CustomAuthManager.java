package com.simplyalgos.backend.user.security;


import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.UUID;

@Slf4j
@Component
public class CustomAuthManager<Type>{

    public boolean userIdMatches(Authentication authentication, Type userId) {
        if(userId instanceof  UUID userUUID){
            log.debug(MessageFormat.format("this is the owner of XThing of type uuid {0}", userUUID));
            return authentication.getName().equals(userUUID.toString().trim());
        }
        log.debug(MessageFormat.format("this is the owner of Xthing {0}", userId));
        return authentication.getName().equals((String)userId);
    }
}
