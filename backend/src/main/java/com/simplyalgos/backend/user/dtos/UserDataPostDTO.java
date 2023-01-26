package com.simplyalgos.backend.user.dtos;


import com.simplyalgos.backend.utils.ImageUtils;
import lombok.*;

import java.io.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.UUID;

@Setter
@Getter
public class UserDataPostDTO {

    UUID userId;
    String username;
    String firstName;
    String lastName;
    String email;
    @Setter(AccessLevel.NONE)
    File profilePicture;
    String biography;
    String phoneNumber;
    Timestamp createdDate;
    Date dob;
    String role;

    @Builder
    public UserDataPostDTO(UUID userId, String username, String firstName, String lastName, String email, String profilePicture, String biography, String phoneNumber, Timestamp createdDate, Date dob, String role) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePicture = ImageUtils.convertProfilePicture(profilePicture);
        this.biography = biography;
        this.phoneNumber = phoneNumber;
        this.createdDate = createdDate;
        this.dob = dob;
        this.role = role;
    }


}
