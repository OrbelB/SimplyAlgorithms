package com.simplyalgos.backend.comment.repositories.projections;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface UserInfoOnly {

    @Value("#{target.userId}")
    UUID getUserId();

    @Value("#{target.username}")
    String getUsername();

    @Value("#{target.firstName}")
    String getFirstName();


    @Value("#{target.lastName}")
    String getLastName();

    @Value("#{target.profilePicture}")
    String getProfilePicture();
}
