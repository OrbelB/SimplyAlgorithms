package com.simplyalgos.backend.utils;

import com.simplyalgos.backend.exceptions.NotExpectedObjectException;
import jakarta.xml.bind.DatatypeConverter;
import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.util.Arrays;


@Slf4j
public class ImageUtils {

    public static File convertProfilePicture(String profilePicture) {
        if (!StringUtils.isNotNullAndEmptyOrBlank(profilePicture)) return null;
        String[] image = profilePicture.split(",");

        // check if the string is base 64 string
        if(image.length != 2 || !isBase64(image)) throw new NotExpectedObjectException("The string is not a base 64 string");

        // setting up the file format
        String fileType = switch (image[0]) { //check image's format
            case "data:image/jpeg;base64" -> "jpeg";
            case "data:image/png;base64" -> "png";
            default -> "jpg";
        };

        File picture = new File("profilePicture." + fileType);

        // getting the bytes from the base 64 string
        byte[] data = DatatypeConverter.parseBase64Binary(image[1]);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(picture))) {
            outputStream.write(data);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return picture;
    }

    // check if the string base 64 is valid
    public static boolean isBase64(String[] base64) {
        try {
            DatatypeConverter.parseBase64Binary(base64[1]);
            return base64[0].contains("data") && base64[0].contains("base64");
        }catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return false;
        }
    }
}
