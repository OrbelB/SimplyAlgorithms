package com.simplyalgos.backend.user;

import com.simplyalgos.backend.user.dtos.UserDTO;
import com.simplyalgos.backend.user.dtos.UserDataPostDTO;

import java.util.Set;
import java.util.UUID;

public interface UserService {

    Set<UserDTO> parseUsers();

    UserDTO getUser(String userId);

    User getUser(UUID user);

    UserDTO updateUser(UserDataPostDTO userToUpdate);

    boolean userExists(UUID userId);

    UUID removeUser(UUID userId);
}
