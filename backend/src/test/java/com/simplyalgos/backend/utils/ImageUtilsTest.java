package com.simplyalgos.backend.utils;

import com.simplyalgos.backend.TestUtil;
import com.simplyalgos.backend.exceptions.NotExpectedObjectException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import java.io.File;

import static org.junit.jupiter.api.Assertions.*;


class ImageUtilsTest {

    private final static String DUMMY_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/" +
            "2wCEAAkGBxISEhUSEhIVFRUVFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLis";

    @Test
    void convertProfilePicture() {
        File file = ImageUtils.convertProfilePicture(DUMMY_IMAGE);

        //checking if the file was created, not null, is a file, can be read and is not empty
        TestUtil.assertFile(file);
    }

    @Test
    void fileIsNull() {
        File file = ImageUtils.convertProfilePicture("");
        assertNull(file);
    }

    @Test
    void fileIsNotBase64WithMessage() {
        Executable executable = () -> ImageUtils.convertProfilePicture("test");
        NotExpectedObjectException exception = assertThrows(NotExpectedObjectException.class, executable, "Expected throw HTTP 400");
        assertAll("File Exception Message",
                () -> assertEquals("The string is not a base 64 string", exception.getMessage(), "The message is not the same"),
                () -> assertEquals("The string is not a base 64 string", exception.getLocalizedMessage(), "The message is not the same")
        );
    }

    @Test
    void fileIsNotBase64AndIncludesComma() {
        Executable executable = () -> ImageUtils.convertProfilePicture("test,test");
        NotExpectedObjectException exception = assertThrows(NotExpectedObjectException.class, executable, "Expected throw HTTP 400");
        assertEquals("The string is not a base 64 string", exception.getMessage());
    }
}