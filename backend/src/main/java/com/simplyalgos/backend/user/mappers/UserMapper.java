package com.simplyalgos.backend.user.mappers;

import com.simplyalgos.backend.user.User;
import com.simplyalgos.backend.user.dtos.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "userId", target = "userId")
    UserDTO userDtoTOUser(User user);

    User userToUserDto(UserDTO user);

}
