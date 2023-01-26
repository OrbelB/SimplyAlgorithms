package com.simplyalgos.backend.utils;

import jakarta.xml.bind.DatatypeConverter;
import lombok.extern.slf4j.Slf4j;

import java.io.*;


@Slf4j
public class ImageUtils {

    public static File convertProfilePicture(String profilePicture) {
        if (profilePicture == null || profilePicture.isBlank() || profilePicture.isEmpty()) return null;
        String[] image = profilePicture.split(",");
        log.debug(image[0] + " check the image extension");
        // setting up the fileType
        String fileType = switch (image[0]) { //check image's fileType
            case "data:image/jpeg;base64" -> "jpeg";
            case "data:image/png;base64" -> "png";
            default ->//should write cases for more images types
                    "jpg";
        };
        File picture = new File("profilePicture." + fileType);

        // getting the bytes from the base 64 string
        byte[] data = DatatypeConverter.parseBase64Binary(image[1]);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(picture))) {
            outputStream.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return picture;
    }
}
