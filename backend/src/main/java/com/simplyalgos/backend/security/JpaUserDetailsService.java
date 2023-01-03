package com.simplyalgos.backend.security;

import com.simplyalgos.backend.exceptions.PasswordsDontMatchException;
import com.simplyalgos.backend.storage.StorageService;
import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.user.security.RoleRepository;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.mappers.UserRegisteredMapper;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import com.simplyalgos.backend.web.dtos.UpdatePassword;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
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
@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserRegisteredMapper userRegisteredMapper;

    private final RoleRepository roleRepository;

    private final StorageService storageService;

    @Transactional
    public void createUser(SignupDTO userDto) throws Exception {
        //assign user role by default : student
        if (userRepository.findByUsername(userDto.username()).isPresent()) {
            throw new Exception("username exists!");
        }
        User user = userRegisteredMapper.create(userDto);
        user.setProfilePicture(userDto.profilePicture());
        user.setRoles(Set.of(assignRoleToNewUser("STUDENT")));
        user.setPassword(passwordEncoder.encode(userDto.password()));
        userRepository.save(user);
    }

    @Transactional
    protected Role assignRoleToNewUser(String roleToAssign) {
        return roleRepository.getRoleByRoleName(roleToAssign).orElseThrow(() ->
                new NullPointerException(MessageFormat.format("Role {0} not found ", roleToAssign))
        );
    }

    @Transactional
    public UUID updatePassword(UpdatePassword updatePassword) {
        Optional<User> optionalUser = userRepository.findById(updatePassword.userId());
        User user;
        if(optionalUser.isPresent()){
            user = optionalUser.get();
            if(passwordEncoder.matches(updatePassword.oldPassword(), user.getPassword())){
                user.setPassword(passwordEncoder.encode(updatePassword.newPassword()));
                return updatePassword.userId();
            }
            throw new PasswordsDontMatchException(
                    MessageFormat
                            .format("password provided does not match with our records for user with id {0}",
                                    updatePassword.userId()));
        }
        throw new UsernameNotFoundException(MessageFormat.format("User with id {0} not found" , updatePassword.userId()));
    }

    @Transactional
    public Boolean IsUserAccountNonLockedAndAuthenticated(String userId) {
        Optional<User> isValidUser = userRepository.findById(UUID.fromString(userId));
        return isValidUser.isPresent() && isValidUser.get().isAccountNonLocked() && isValidUser.get().isAccountNonExpired();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username: " + username + " not found"));
    }
}
