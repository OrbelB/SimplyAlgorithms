package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.storage.StorageService;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.UserDTO;
import com.simplyalgos.backend.user.dtos.UserDataPostDTO;
import com.simplyalgos.backend.user.mappers.UserMapper;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
            if (isNotNullNorEmptyNorBlank(userToUpdate.getProfilePicture())) {
                user.setProfilePicture(userToUpdate.getProfilePicture());
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
