package com.simplyalgos.backend.user.mappers;


import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.UserDTO;
import com.simplyalgos.backend.user.dtos.UserDataDTO;
import com.simplyalgos.backend.user.dtos.UserDataPostDTO;
import com.simplyalgos.backend.user.dtos.UserPreferencesDTO;
import com.simplyalgos.backend.user.security.Role;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;


@Setter
public class UserMapperDecorator implements UserMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDTO userToUserDto(User user) {
        UserDTO userDTO = userMapper.userToUserDto(user);
        if (user.getRoles() != null) {
            userDTO.setRole(user.getRoles().stream().findFirst().get().getRoleName());
        }
        return userDTO;
    }

    @Override
    public UserDataDTO userTOUserDataDTO(User user) {
        return userMapper.userTOUserDataDTO(user);
    }

    @Override
    public UserDTO userToUserDto(User user, UserPreferencesDTO userPreferencesDTO) {
        UserDTO userDTO = userMapper.userToUserDto(user, userPreferencesDTO);
        if (user.getRoles() != null) {
            userDTO.setRole(user
                    .getRoles()
                    .stream()
                    .findFirst()
                    .orElseGet(() -> Role.builder().roleName("user has no role")
                            .build())
                    .getRoleName());
        }
        return userDTO;
    }

    @Override
    public User userDtoToUser(UserDTO user) {
        return userMapper.userDtoToUser(user);
    }

    @Override
    public void updateUser(UserDataPostDTO userDTO, User user) {
        userMapper.updateUser(userDTO, user);
    }
}
