package com.simplyalgos.backend.security;

import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import com.simplyalgos.backend.web.dtos.UpdatePassword;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.UUID;

public interface JpaUserDetailsService extends UserDetailsService {

    void createUser(SignupDTO userDto) throws Exception;


    Role assignRoleToNewUser(String roleToAssign);


    UUID updatePassword(UpdatePassword updatePassword);


    Boolean IsUserAccountNonLockedAndAuthenticated(String userId);

    @Override
    UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException;

    UUID resetUserPassword(UUID userId, String newPassword);
}
