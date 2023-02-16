package com.simplyalgos.backend.user.security;


import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.enums.UserRoles;
import com.simplyalgos.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Component
public class CustomAuthManager<Type> {
    private final UserService userService;

    public boolean userIdMatches(Authentication authentication, Type userId) {

        boolean isAdmin = isAdmin(UUID.fromString(authentication.getName()));

        if (userId instanceof UUID userUUID) {
            if (isAdmin) return true;
            return Objects.equals(authentication.getName(), userUUID.toString().trim());
        }
        if (isAdmin) return true;
        return Objects.equals(authentication.getName(), (String) userId);
    }

    private boolean isAdmin(UUID userUUID) {
        User user = userService.getUser(userUUID);
        return user
                .getRoles()
                .stream()
                .anyMatch(role -> role.getRoleName().equals(UserRoles.ADMIN.name()));
    }
}
