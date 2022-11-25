package com.simplyalgos.backend.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface StorageService {
    String deleteFile(String fileName);

    byte[] getFile(String fileName);

    String uploadImageFile(MultipartFile file);

    String updateProfilePicture(MultipartFile file, String oldPath);

}
