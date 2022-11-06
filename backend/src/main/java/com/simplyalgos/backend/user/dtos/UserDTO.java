package com.simplyalgos.backend.user.dtos;

import lombok.*;

import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO {
    UUID userId;
    String username;
    String email;
    String profilePicture;
}
