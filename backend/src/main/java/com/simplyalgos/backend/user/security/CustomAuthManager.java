package com.simplyalgos.backend.user.security;



import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.util.*;

@Slf4j
@Component
public class CustomAuthManager<Type> {

    public boolean userIdMatches(Authentication authentication, Type userId) {

        if (userId instanceof UUID userUUID) {
            return Objects.equals(authentication.getName(), userUUID.toString().trim());
        }
        return Objects.equals(authentication.getName(), (String) userId);
    }
}
