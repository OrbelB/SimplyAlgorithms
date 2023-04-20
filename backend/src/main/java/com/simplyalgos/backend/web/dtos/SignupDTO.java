package com.simplyalgos.backend.web.dtos;

import com.simplyalgos.backend.utils.ImageUtils;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.*;
import java.sql.Date;


@Setter
@Getter
public class SignupDTO {
    String username;
    String password;
    String email;
    String firstName;
    String lastName;
    @DateTimeFormat(pattern = "MM-DD-YYYY")
    Date dob;

    // let other classes set this using setProfilePicture
    File profilePicture;

    public void setProfilePicture(File profilePicture) {
        this.profilePicture = profilePicture;
    }
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = ImageUtils.convertProfilePicture(profilePicture, "profile-picture");
    }

    @Builder
    public SignupDTO(String username, String password, String email, String firstName, String lastName, Date dob, String profilePicture) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.profilePicture = ImageUtils.convertProfilePicture(profilePicture, "profile-picture");
    }


}
