package com.simplyalgos.backend.user;

import com.simplyalgos.backend.user.dtos.UserDTO;
import com.simplyalgos.backend.user.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public Set<UserDTO> parseUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(userMapper::userDtoTOUser)
                .collect(Collectors.toSet());
    }

    public UserDTO getUser(String userId) {
        return userMapper.userDtoTOUser(userRepository
                .findById(UUID.fromString(userId))
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + userId + " not found"))
        );
    }

}
