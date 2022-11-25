package com.simplyalgos.backend.user.dtos;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.UUID;

@Slf4j
@Setter
@Getter
@Data
public class UserDataPostDTO {

    UUID userId;
    String username;
    String firstName;
    String lastName;
    String email;
    String profilePicture;
    String biography;
    String phoneNumber;
    Timestamp createdDate;
    Date dob;
    String role;
}
