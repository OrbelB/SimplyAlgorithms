package com.simplyalgos.backend.user;

import com.simplyalgos.backend.user.dtos.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto userDtoTOUser(User user);

    User userToUserDto(UserDto user);

}
