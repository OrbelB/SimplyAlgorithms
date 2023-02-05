package com.simplyalgos.backend.user.mappers;


import com.simplyalgos.backend.user.domains.UserPreferences;
import com.simplyalgos.backend.user.dtos.UserPreferencesDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserPreferencesMapper {


    @Mapping(target = "userId", ignore = true)
    void updateUserPreferences(@MappingTarget UserPreferences userPreferences, UserPreferencesDTO userPreferencesDTO);

    UserPreferencesDTO userPreferencesToUserPreferencesDTO(UserPreferences userPreferences);

    UserPreferences userPreferenceDtoToUserPreference(UserPreferencesDTO userPreferencesDTO);
}
