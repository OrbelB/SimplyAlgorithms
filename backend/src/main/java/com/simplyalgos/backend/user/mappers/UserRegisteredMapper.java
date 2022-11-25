package com.simplyalgos.backend.user.mappers;

import com.simplyalgos.backend.user.User;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;



@Mapper(componentModel = "spring")
public interface UserRegisteredMapper {
    @Mapping(target = "profilePicture", ignore = true)
    public User create(SignupDTO userCreated);
}
