package com.simplyalgos.backend.user.mappers;

import com.simplyalgos.backend.user.User;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface UserRegisteredMapper {
    public User create(SignupDTO userCreated);
}
