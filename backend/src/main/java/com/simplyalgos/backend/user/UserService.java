package com.simplyalgos.backend.user;

import com.simplyalgos.backend.user.dtos.UserDTO;

import java.util.Set;
import java.util.UUID;

public interface UserService {

    Set<UserDTO> parseUsers();

    UserDTO getUser(String userId);

    User getUser(UUID user);

    boolean userExists(UUID userId);
}
