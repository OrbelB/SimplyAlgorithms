package com.simplyalgos.backend.utils;

import com.simplyalgos.backend.TestUtil;
import org.junit.jupiter.api.Test;

import java.io.File;

import static org.junit.jupiter.api.Assertions.assertNull;


class ImageUtilsTest {

    private final static String DUMMY_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/" +
            "2wCEAAkGBxISEhUSEhIVFRUVFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLis";

    @Test
    void convertProfilePicture() {
        File file = ImageUtils.convertProfilePicture(DUMMY_IMAGE,"dummy-image");

        //checking if the file was created, not null, is a file, can be read and is not empty
        assert file != null;
        TestUtil.assertFile(file);
    }

    @Test
    void fileIsNull() {
        File file = ImageUtils.convertProfilePicture("", "");
        assertNull(file);
    }

    @Test
    void fileIsNotBase64WithMessage() {

        // file not base 64 should return null
        File file = ImageUtils.convertProfilePicture("test", "test");
        assertNull(file, "file is not base 64");
    }

    @Test
    void fileIsNotBase64AndIncludesComma() {
        File file =  ImageUtils.convertProfilePicture("test,test" , "test");
        assertNull(file, "file is not base 64 and includes comma");
    }
}