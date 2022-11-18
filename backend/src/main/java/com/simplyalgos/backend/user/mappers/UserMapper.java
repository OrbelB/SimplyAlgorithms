package com.simplyalgos.backend.user.mappers;

import com.simplyalgos.backend.user.User;
import com.simplyalgos.backend.user.dtos.UserDTO;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
@DecoratedWith(UserMapperDecorator.class)
public interface UserMapper {
    @Mapping(target = "role", ignore = true)
    UserDTO userToUserDto(User user);

    @Mapping(target = "forumsCreated", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "daysLoggedIn", ignore = true)
    @Mapping(target = "credentialsNonExpired", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "commentVotes", ignore = true)
    @Mapping(target = "commentReports", ignore = true)
    @Mapping(target = "accountNonLocked", ignore = true)
    @Mapping(target = "accountNonExpired", ignore = true)
    @Mapping(target = "views", ignore = true)
    @Mapping(target = "userHistories", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "quizzes", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "pageVotes", ignore = true)
    @Mapping(target = "pageReports", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    User userDtoToUser(UserDTO user);



    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "views", ignore = true)
    @Mapping(target = "userHistories", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "quizzes", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "pageVotes", ignore = true)
    @Mapping(target = "pageReports", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "forumsCreated", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "daysLoggedIn", ignore = true)
    @Mapping(target = "credentialsNonExpired", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "commentVotes", ignore = true)
    @Mapping(target = "commentReports", ignore = true)
    @Mapping(target = "accountNonLocked", ignore = true)
    @Mapping(target = "accountNonExpired", ignore = true)
    void updateUser(UserDTO userDTO, @MappingTarget User user);
}
