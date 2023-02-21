package com.simplyalgos.backend.web.dtos;

import com.simplyalgos.backend.TestUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;

import java.io.File;

import static org.junit.jupiter.api.Assertions.*;

class SignupDTOTest {

    private final static String PROFILE_PICTURE_BASE_64_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/" +
            "2wCEAAkGBxISEhUSEhIVFRUVFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLis";
    SignupDTO signupDTO;


    @BeforeEach
    void setUp() {
        signupDTO = null;
    }

    @DisplayName("Test Profile Picture Creation Using Builder Pattern")
    @RepeatedTest(value = 10, name = "{displayName} - {currentRepetition}/{totalRepetitions} ")
    void testProfilePictureCreationUsingBuilderPattern() {
        signupDTO = SignupDTO.builder().profilePicture(PROFILE_PICTURE_BASE_64_IMAGE).build();
        File file = signupDTO.getProfilePicture();

        //checking if the file was created, not null, is a file, can be read and is not empty
        TestUtil.assertFile(file);
    }

    @DisplayName("Test Profile Picture Creation Using Constructor")
    @RepeatedTest(value = 10, name = "{displayName} - {currentRepetition}/{totalRepetitions} ")
    void testProfilePictureCreationUsingConstructor() {
        signupDTO = new SignupDTO(null, null, null, null, null, null, PROFILE_PICTURE_BASE_64_IMAGE);
        File file = signupDTO.getProfilePicture();

        //checking if the file was created, not null, is a file, can be read and is not empty
        TestUtil.assertFile(file);
    }

    @Test
    void testProfilePictureCreationUsingSetter() {
        signupDTO = new SignupDTO(null, null, null, null, null, null, null);
        signupDTO.setProfilePicture(PROFILE_PICTURE_BASE_64_IMAGE);

        File file = signupDTO.getProfilePicture();

        //checking if the file was created, not null, is a file, can be read and is not empty
        TestUtil.assertFile(file);
    }
}