package com.simplyalgos.backend.security;

import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import com.simplyalgos.backend.web.dtos.UpdatePassword;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.UUID;

public interface JpaUserDetailsService extends UserDetailsService {

    void createUser(SignupDTO userDto);


    Role assignRoleToNewUser(String roleToAssign);


    UUID updatePassword(UpdatePassword updatePassword);


    Boolean IsUserAccountNonLockedAndAuthenticated(String userId);

    @Override
    UserDetails loadUserByUsername(String identifier);

    UUID resetUserPassword(UUID userId, String newPassword);
}
