package com.simplyalgos.backend.user;

import com.simplyalgos.backend.user.dtos.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    protected Set<UserDto> parseUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(userMapper::userDtoTOUser)
                .collect(Collectors.toSet());
    }

}
