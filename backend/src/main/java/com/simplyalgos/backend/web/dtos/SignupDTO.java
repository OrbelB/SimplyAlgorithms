package com.simplyalgos.backend.web.dtos;

import lombok.Builder;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;

@Builder
public record SignupDTO(
        String username,
        String password,
        String email,
        String firstName,
        String lastName,
        @DateTimeFormat(pattern = "MM-DD-YYYY")
        Date dob,
        String profilePicture
) {
}
