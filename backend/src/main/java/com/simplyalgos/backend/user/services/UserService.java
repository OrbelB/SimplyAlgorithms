package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.*;
import com.simplyalgos.backend.user.repositories.projections.UserInformationOnly;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.util.UUID;

public interface UserService {

    void requestRoleChange(RoleChangeForm roleChangeForm);

    ObjectPagedList<UserInformationOnly> listAllUsers(Pageable pageable);

    UserDTO getUser(String userId);

    User getUser(UUID user);

    UserDTO updateUser(UserDataPostDTO userToUpdate);

    boolean emailIsAvailable(String email);
    boolean usernameIsAvailable(String username);

    boolean userExists(UUID userId);

    UUID removeUser(String userIdOrUsername);

//    boolean userEmailExists(String email);
    User getUserByUsername(String username);

//    if it exists the return a user
    User userUserNameExists(String username);

    boolean getUsername(GetUsernameDTO getUsernameDTO);

    UUID changeUserRole(String usernameOrId, String role);

    UUID LockUserAccount(String usernameOrId, int lengthOfLock, boolean accountNonLocked);

    boolean isUserLocked(String username);

    Timestamp daysToTimestamp(int days);

//    if the lock date is expired ie current date is after LockDate then it will unlock user
    boolean accountLockExpired(String username);




}
