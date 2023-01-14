package com.simplyalgos.backend.web.dtos;

import jakarta.xml.bind.DatatypeConverter;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.*;
import java.sql.Date;


@Slf4j
@Data
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
        this.profilePicture = convertProfilePicture(profilePicture);
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
