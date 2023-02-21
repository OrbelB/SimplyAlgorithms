package com.simplyalgos.backend;

import java.io.File;

import static org.junit.jupiter.api.Assertions.*;

public class TestUtil {
    public static void assertFile(File file) {
        //checking if the file was created, not null, is a file, can be read and is not empty
        assertAll("file",
                () -> assertNotNull(file, "file is null"),
                () -> assertTrue(file.exists(), "file does not exist"),
                () -> assertTrue(file.isFile(), "file is not a file"),
                () -> assertTrue(file.canRead(), "file cannot be read"),
                () -> assertTrue(file.length() > 0, "file is empty")
        );

        // delete the file after the test
        file.delete();

        //test that the file is deleted
        assertFalse(file.exists());
    }
}
