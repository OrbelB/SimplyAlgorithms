package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.emailing.services.EmailService;
import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.storage.StorageService;
import com.simplyalgos.backend.user.domains.ResetPasswordRequestEmailValues;
import com.simplyalgos.backend.user.domains.User;
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


//    @Getter
//    @NoArgsConstructor
//    private class ResetPasswordRequestEmailValues{
//        @NonNull
//        final String from = "noreply@simplyalgorithms.com";
//        @NonNull
//        String subject = "Simply Algorithms password reset";
//
//        String body = "A password reset request was made, please click on the link to reset your password, If you hanvt made such request please ignore this email";
//    }

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final StorageService storageService;

    private final EmailService emailService;

    public Set<UserDTO> parseUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(userMapper::userToUserDto)
                .collect(Collectors.toSet());
    }

    public UserDTO getUser(String userId) {
        return userMapper.userToUserDto(userRepository
                .findById(UUID.fromString(userId))
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + userId + " not found"))
        );
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
        log.debug(MessageFormat.format("this is the passed profiledPicture {0}", userToUpdate.getProfilePicture()));
        User user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            if (isNotNullNorEmptyNorBlank(userToUpdate.getBiography())) user.setBiography(userToUpdate.getBiography());
            if (isNotNullNorEmptyNorBlank(userToUpdate.getEmail())) user.setEmail(userToUpdate.getEmail());
            if (isNotNullNorEmptyNorBlank(userToUpdate.getUsername())) user.setUsername(userToUpdate.getUsername());
            if (isNotNullNorEmptyNorBlank(userToUpdate.getFirstName())) user.setFirstName(userToUpdate.getFirstName());
            if (isNotNullNorEmptyNorBlank(userToUpdate.getLastName())) user.setLastName(userToUpdate.getLastName());
            if (userToUpdate.getDob() != null) user.setDob(userToUpdate.getDob());
            if (userToUpdate.getProfilePicture() != null) {
                user.setProfilePicture(storageService
                        .updateProfilePicture(userToUpdate.getProfilePicture(),
                                user.getProfilePicture()));
            }
            if (isNotNullNorEmptyNorBlank(userToUpdate.getPhoneNumber()))
                user.setPhoneNumber(userToUpdate.getPhoneNumber());
            return userMapper.userToUserDto(user);
        }

        throw new NoSuchElementException(
                MessageFormat
                        .format("user with id {0} not found", userToUpdate.getUserId())
        );
    }

    private boolean isNotNullNorEmptyNorBlank(String attribute) {
        if (attribute == null) return false;
        return !(attribute.isEmpty() && attribute.isBlank());
    }

    @Override
    public boolean userExists(UUID userId) {
        return userRepository.existsById(userId);
    }

//    @Override
//    public boolean userEmailExists(String email) {
//        User user = userRepository.findByEmail(email).orElseThrow(() -> {
//            log.info("EMAIL " + email + " NOT FOUND");
//            return new ElementNotFoundException();
//        });
//        log.info(user.getEmail() + " -- " + email);
//        if(user.getEmail() == email){
//            return true;
//        }
//        return false;
//    }

    @Override
    public boolean userUserNameExists(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> {
            log.info("USERNAME: " + username + " NOT FOUND");
            return new ElementNotFoundException();
        });
        log.info("USER FOUND FROM FRONT END: " + username + " ----- FROM DATABASE" + user.getUsername());
        //a better way is required but this will do for now

        String tempEmail = "bobsb5038@gmail.com";
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(ResetPasswordRequestEmailValues.FROM.label);
        simpleMailMessage.setSubject(ResetPasswordRequestEmailValues.SUBJECT.label);
        simpleMailMessage.setText(ResetPasswordRequestEmailValues.BODY.label + " " + user.getEmail());

        simpleMailMessage.setTo(tempEmail);
//        simpleMailMessage.setTo(user.getEmail());

        log.info(user.getEmail() + " USER EMAIL");

        emailService.sendEmail(simpleMailMessage);
        return true;
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

}
