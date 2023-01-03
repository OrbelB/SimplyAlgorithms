package com.simplyalgos.backend.user.mappers;


import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public class UserMapperDecorator implements UserMapper {

    private UserMapper userMapper;

    @Autowired
    @Qualifier("delegate")
    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO userToUserDto(User user) {
        UserDTO userDTO = userMapper.userToUserDto(user);
        if(user.getRoles() != null){
            userDTO.setRole(user.getRoles().stream().findFirst().get().getRoleName());
        }
        return userDTO;
    }

    @Override
    public User userDtoToUser(UserDTO user) {
        return userMapper.userDtoToUser(user);
    }

    @Override
    public void updateUser(UserDTO userDTO, User user) {

    }
}
