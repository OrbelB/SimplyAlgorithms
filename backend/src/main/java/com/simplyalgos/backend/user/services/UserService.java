package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.GetUsernameDTO;
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

//    boolean userEmailExists(String email);
    User getUserByUsername(String username);

//    if it exists the return a user
    User userUserNameExists(String username);

    boolean getUsername(GetUsernameDTO getUsernameDTO);



}
