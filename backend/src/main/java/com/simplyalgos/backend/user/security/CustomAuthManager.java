package com.simplyalgos.backend.user.security;


import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Set;
import java.util.UUID;

//@RequiredArgsConstructor
@Slf4j
@Component
public class CustomAuthManager<Type>{
//    private final UserService userService;
//    private final String ADMIN_ROLE = "ADMIN";
    public boolean userIdMatches(Authentication authentication, Type userId) {


        if(userId instanceof  UUID userUUID){
            log.debug(MessageFormat.format("this is the owner of XThing of type uuid {0} +++ ", userUUID));

//            User user = userService.getUser(userUUID);
//            log.debug("THE ROLE: " + user.getRoles().iterator().next().getRoleName());
//            log.debug(user.getRoles().iterator().next().getRoleName().equals(ADMIN_ROLE) + " ~~~ ");

//            log.debug(isAdmin(userUUID) + " IS ADMIN ~~~");
//            return authentication.getName().equals(userUUID.toString().trim()) || isAdmin(userUUID);
            return authentication.getName().equals(userUUID.toString().trim());
        }
        log.debug(MessageFormat.format("this is the owner of Xthing {0} ~~~", userId));
        return authentication.getName().equals((String)userId);
    }

//    private boolean isAdmin(UUID userUUID) {
//            User user = userService.getUser(userUUID);
//            log.debug(MessageFormat.format("this is the owner of XThing of type uuid and is tested for admin role {0}", userUUID));
//            log.debug("Checking if user " + userUUID + " is a admin ~~~");
//            log.debug(user.getRoles().iterator().next().getRoleName() + " ROLE ~~~");
//            return user.getRoles().iterator().next().getRoleName().equals(ADMIN_ROLE);
//    }
}
