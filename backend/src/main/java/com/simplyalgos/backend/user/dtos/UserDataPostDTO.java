package com.simplyalgos.backend.user.dtos;


import jakarta.xml.bind.DatatypeConverter;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.UUID;

@Slf4j
@Data
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
        this.profilePicture = convertProfilePicture(profilePicture);
        this.biography = biography;
        this.phoneNumber = phoneNumber;
        this.createdDate = createdDate;
        this.dob = dob;
        this.role = role;
    }

    public static File convertProfilePicture(String profilePicture) {
        String[] image = profilePicture.split(",");
        log.debug(image[0] + " check the image extension");
        // setting up the fileType
        String fileType = switch (image[0]) { //check image's fileType
            case "data:image/jpeg;base64" -> "jpeg";
            case "data:image/png;base64" -> "png";
            default ->//should write cases for more images types
                    "jpg";
        };
        File picture = new File("profilePicture." + fileType);

        // getting the bytes from the base 64 string
        byte[] data = DatatypeConverter.parseBase64Binary(image[1]);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(picture))) {
            outputStream.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return picture;
    }
}
