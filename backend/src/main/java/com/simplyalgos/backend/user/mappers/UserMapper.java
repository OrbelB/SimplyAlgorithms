package com.simplyalgos.backend.user.mappers;

import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.*;
import com.simplyalgos.backend.utils.StringUtils;
import org.mapstruct.*;

@Mapper(componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
@DecoratedWith(UserMapperDecorator.class)
public interface UserMapper {

    @Mapping(target = "userId", source = "userId")
    @Mapping(target = "role", ignore = true)
    UserDTO userToUserDto(User user);

    @Mapping(target = "role" ,
            expression = "java(user.getRoles().stream()" +
                    ".findFirst().orElseThrow()" +
                    ".getRoleName())")
    UserInformation userToUserInformation(User user);
    UserDataDTO userTOUserDataDTO(User user);

    User userDataDTOToUser(UserDataDTO userDataDTO);


    @Mapping(target = "UserPreferencesDTO.userId", ignore = true)
    @Mapping(target = "userId", source = "user.userId")
    @Mapping(target = "role", ignore = true)
    UserDTO userToUserDto(User user, UserPreferencesDTO userPreferencesDTO);


    @Mapping(target = "userId", source = "userId")
    @Mapping(target = "forumsCreated", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "credentialsNonExpired", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "commentVotes", ignore = true)
    @Mapping(target = "commentReports", ignore = true)
    @Mapping(target = "accountNonLocked", ignore = true)
    @Mapping(target = "accountNonExpired", ignore = true)
    @Mapping(target = "views", ignore = true)
    @Mapping(target = "takenQuizzes", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "pageVotes", ignore = true)
    @Mapping(target = "pageReports", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "role", ignore = true)
    User userDtoToUser(UserDTO user);



    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "views", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "takenQuizzes", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "pageVotes", ignore = true)
    @Mapping(target = "pageReports", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "forumsCreated", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "credentialsNonExpired", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "commentVotes", ignore = true)
    @Mapping(target = "commentReports", ignore = true)
    @Mapping(target = "accountNonLocked", ignore = true)
    @Mapping(target = "accountNonExpired", ignore = true)
    @Mapping(target = "profilePicture", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    void updateUser(UserDataPostDTO userDTO, @MappingTarget User user);

    @Condition
    default boolean isNotNullNorEmptyNorBlank(Object attribute){
        if(attribute instanceof String xString) {
            return StringUtils.isNotNullAndEmptyOrBlank(xString);
        }
        return attribute != null;
    }

}
