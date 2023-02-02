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
    File profilePicture;

    @Builder
    SignupDTO(String username, String password, String email, String firstName, String lastName, Date dob, String profilePicture) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.profilePicture = ImageUtils.convertProfilePicture(profilePicture);
    }

}
