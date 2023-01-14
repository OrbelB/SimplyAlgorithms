package com.simplyalgos.backend.storage;

import java.io.File;

public interface StorageService {
    String deleteFile(String fileName);

    byte[] getFile(String fileName);

    String uploadImageFile(File file);

    String updateProfilePicture(File file, String oldPath);

}
