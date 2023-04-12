package com.simplyalgos.backend.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDataDTO {
    UUID userId;
    String username;
    String firstName;
    String lastName;
    String profilePicture;
    String roleName;
}
