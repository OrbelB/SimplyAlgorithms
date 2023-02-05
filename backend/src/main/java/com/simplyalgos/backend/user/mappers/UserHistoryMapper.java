package com.simplyalgos.backend.user.mappers;

import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.domains.UserHistory;
import org.mapstruct.Mapper;

import java.sql.Date;
import java.util.UUID;

@Mapper(componentModel = "spring")
public interface UserHistoryMapper {

    UserHistory createUserHistory(Date dayLoggedIn, UUID userId,
                                  short dayStreak, User userReference);
}
