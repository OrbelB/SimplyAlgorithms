package com.simplyalgos.backend.user.dtos;

import com.simplyalgos.backend.TestUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.File;

class UserDataPostDTOTest {

    private final static String PROFILE_PICTURE_BASE_64_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/" +
            "2wCEAAkGBxISEhUSEhIVFRUVFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLis";
    private UserDataPostDTO userDataPost;


    @BeforeEach
    void setUp() {
        userDataPost = null;
    }

    @Test
    void testProfilePictureCreationUsingBuilderPattern() {
        userDataPost = UserDataPostDTO.builder().profilePicture(PROFILE_PICTURE_BASE_64_IMAGE).build();
        File file = userDataPost.getProfilePicture();

        //checking if the file was created, not null, is a file, can be read and is not empty
        TestUtil.assertFile(file);
    }

    @Test
    void testProfilePictureCreationUsingConstructor() {
        userDataPost = new UserDataPostDTO(null, null, null, null, null,
                PROFILE_PICTURE_BASE_64_IMAGE, null, null , null, null,   null );
        File file = userDataPost.getProfilePicture();

        //checking if the file was created, not null, is a file, can be read and is not empty
        TestUtil.assertFile(file);
    }

    @Test
    void testProfilePictureCreationUsingSetter() {
        userDataPost = new UserDataPostDTO(null, null, null, null, null,
                null, null, null , null, null,   null );
        userDataPost.setProfilePicture(PROFILE_PICTURE_BASE_64_IMAGE);

        File file = userDataPost.getProfilePicture();

        //checking if the file was created, not null, is a file, can be read and is not empty
        TestUtil.assertFile(file);
    }

}