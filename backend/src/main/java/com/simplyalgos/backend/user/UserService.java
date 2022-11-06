package com.simplyalgos.backend.user;

import com.simplyalgos.backend.user.dtos.UserDTO;

import java.util.Set;

public interface UserService {

    Set<UserDTO> parseUsers();

    UserDTO getUser(String userId);
}
