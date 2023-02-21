package com.simplyalgos.backend.storage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class StorageServiceImpl implements StorageService {


    @Value("${application.bucket.name}")
    private String bucketName;

    private final static String BUCKET_URL_ENDPOINT = "https://simplyalgos-photos.s3.amazonaws.com/";
    private final AmazonS3 s3Client;

    @Override
    public String uploadImageFile(File file) {
        log.debug("we are in here trying to upload this image", file.getName());
        String fileName = UUID.randomUUID().toString() + "_" + file.getName();
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, file));
        file.delete();
        return BUCKET_URL_ENDPOINT + fileName;
    }


    @Override
    public String updateProfilePicture(File file, String oldPath) {
        deleteFile(oldPath);
        return uploadImageFile(file);
    }

    public byte[] getFile(String fileName) {
        S3Object s3Object = s3Client.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            return IOUtils.toByteArray(inputStream);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public String deleteFile(String fileName)  {
        if (fileName.length() < BUCKET_URL_ENDPOINT.length()) return null;
        String filepath = fileName.replace(BUCKET_URL_ENDPOINT, "");
        log.info(filepath + " check current value should be without the url ");
        s3Client.deleteObject(bucketName, filepath);
        return filepath;
    }

}
