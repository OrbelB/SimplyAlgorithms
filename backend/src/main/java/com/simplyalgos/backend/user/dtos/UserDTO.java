package com.simplyalgos.backend.user.dtos;

import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO {
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
    UserPreferencesDTO userPreferencesDTO;
}
