package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.emailing.services.EmailService;
import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.storage.StorageService;
import com.simplyalgos.backend.user.dtos.UserPreferencesDTO;
import com.simplyalgos.backend.user.enums.GetUsernameRequestEmailValues;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.GetUsernameDTO;
import com.simplyalgos.backend.user.dtos.UserDTO;
import com.simplyalgos.backend.user.dtos.UserDataPostDTO;
import com.simplyalgos.backend.user.mappers.UserMapper;
import com.simplyalgos.backend.user.repositories.UserRepository;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.text.MessageFormat;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final StorageService storageService;

    private final EmailService emailService;

    private final UserPreferenceService userPreferenceService;

    private final DashboardService dashboardService;

    public Set<UserDTO> parseUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(userMapper::userToUserDto)
                .collect(Collectors.toSet());
    }

    public UserDTO getUser(String userId) {

        // get user
        User user = userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + userId + " not found"));


        UserPreferencesDTO userPreferencesDTO = userPreferenceService.getUserPreferences(UUID.fromString(userId));

        return userMapper.userToUserDto(user, userPreferencesDTO);

    }

    public User getUser(UUID userId) {
        return userRepository
                .findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + userId + " Not Found"));
    }

    @Transactional
    @Override
    public UserDTO updateUser(UserDataPostDTO userToUpdate) {
        Optional<User> optionalUser = userRepository.findById(userToUpdate.getUserId());
        log.info(MessageFormat.format("this is the passed profiledPicture {0}", userToUpdate.getProfilePicture()));
        if (optionalUser.isEmpty()) {
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("user with id {0} not found", userToUpdate.getUserId())
            );
        }
        User user = optionalUser.get();
        userMapper.updateUser(userToUpdate, user);
        if (userToUpdate.getProfilePicture() != null) {
            user.setProfilePicture(storageService
                    .updateProfilePicture(userToUpdate.getProfilePicture(),
                            user.getProfilePicture()));
        }

        // notified user
        dashboardService.addAccountChangesNotification(user);

        return userMapper.userToUserDto(user);

    }

    @Override
    public boolean userExists(UUID userId) {
        return userRepository.existsById(userId);
    }


    //will generate the token here and send it to the user
    @Override
    public User userUserNameExists(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> {
            log.info("USERNAME: " + username + " NOT FOUND");
            return new ElementNotFoundException();
        });
        log.info("USER FOUND FROM FRONT END: " + username + " ----- FROM DATABASE" + user.getUsername());
        return user;
    }

    @Override
    public UUID removeUser(UUID userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return userId;
        }
        throw new NoSuchElementException(MessageFormat.format("user with id {0} not found!",
                userId.toString()));
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> {
            log.info("USERNAME: " + username + " NOT FOUND");
            return new ElementNotFoundException();
        });
    }

    @Override
    public boolean getUsername(GetUsernameDTO getUsernameDTO) {
        if (userRepository.existsByEmail(getUsernameDTO.getEmail())) {
            //if user exists then send email
            User user = userRepository.findByEmail(getUsernameDTO.getEmail()).orElseThrow(() -> {
//                log.info("USERNAME: " + getUsernameDTO.getEmail() + " NOT FOUND ~~~");
                return new ElementNotFoundException("Username cannot be found");
            });
//            log.info("EMAILING USER");
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(GetUsernameRequestEmailValues.FROM.label);
            simpleMailMessage.setSubject(GetUsernameRequestEmailValues.SUBJECT.label);
            simpleMailMessage.setText(GetUsernameRequestEmailValues.BODY.label + user.getUsername());
            simpleMailMessage.setTo("verified email");
            emailService.sendEmail(simpleMailMessage);
            return true;
        }
        return false;
    }
}
