package com.simplyalgos.backend.security;

import com.simplyalgos.backend.exceptions.PasswordsDontMatchException;
import com.simplyalgos.backend.storage.StorageService;
import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.user.security.RoleRepository;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.mappers.UserRegisteredMapper;
import com.simplyalgos.backend.user.services.DashboardService;
import com.simplyalgos.backend.user.services.UserHistoryService;
import com.simplyalgos.backend.user.services.UserPreferenceService;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import com.simplyalgos.backend.web.dtos.UpdatePassword;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.text.MessageFormat;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;


/*
 * works with authentication manager to check if a user exists,
 * if it does, it takes the credentials from the db and verifies it
 * */
@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class JpaUserDetailsServiceImpl implements JpaUserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserRegisteredMapper userRegisteredMapper;

    private final RoleRepository roleRepository;

    private final StorageService storageService;

    private final UserHistoryService userHistoryService;

    private final UserPreferenceService userPreferenceService;

    private final DashboardService dashboardService;
    @Override
    public void createUser(SignupDTO userDto) throws Exception {
        //assign user role by default : student
        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new Exception("username exists!");
        }
        User user = userRegisteredMapper.create(userDto);
        if (userDto.getProfilePicture() != null) {
            log.info(userDto.getProfilePicture() + "check if the correct method is call");
            user.setProfilePicture(storageService.uploadImageFile(userDto.getProfilePicture()));
        }
        user.setRoles(Set.of(assignRoleToNewUser("STUDENT")));
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // initialize user preferences
        userPreferenceService.defaultUserPreferences(user.getUserId());
        userRepository.save(user);
    }

    @Override
    public Role assignRoleToNewUser(String roleToAssign) {
        return roleRepository.getRoleByRoleName(roleToAssign).orElseThrow(() ->
                new NullPointerException(MessageFormat.format("Role {0} not found ", roleToAssign))
        );
    }

    @Override
    public UUID updatePassword(UpdatePassword updatePassword) {
        User user = userRepository.findById(updatePassword.userId()).orElseThrow(() ->
                new UsernameNotFoundException(MessageFormat.format("User with id {0} not found", updatePassword.userId())));
        if (passwordEncoder.matches(updatePassword.oldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(updatePassword.newPassword()));
            dashboardService.addPasswordResetNotification(user);
            return updatePassword.userId();
        }
        throw new PasswordsDontMatchException(
                MessageFormat
                        .format("password provided does not match with our records for user with id {0}",
                                updatePassword.userId()));

    }


    @Override
    public Boolean IsUserAccountNonLockedAndAuthenticated(String userId) {
        Optional<User> isValidUser = userRepository.findById(UUID.fromString(userId));
        return isValidUser.isPresent() && isValidUser.get().isAccountNonLocked() && isValidUser.get().isAccountNonExpired();
    }


    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        //find by username or email
        User currentUser = userRepository.findByUsername(identifier)
                .orElseGet(
                        () -> userRepository.findByEmail(identifier)
                                .orElseThrow(
                                        () -> new UsernameNotFoundException(MessageFormat
                                                .format("User with id {0} not found", identifier))));
        userHistoryService.logUserLogging(currentUser); //to log the current user id
        return currentUser;
    }

    @Override
    public UUID resetUserPassword(UUID userId, String newPassword) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException(MessageFormat.format("User with id {0} not found", userId)));
        user.setPassword(passwordEncoder.encode(newPassword));
        dashboardService.addPasswordResetNotification(user);
        return user.getUserId();
//       send email to the user notifying his password was reset
    }
}

