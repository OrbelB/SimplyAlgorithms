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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class StorageServiceImpl implements StorageService {


    @Value("${application.bucket.name}")
    private String bucketName;

    private final static String BUCKET_URL_ENDPOINT = "https://profile-image-storage-simplyalgo.s3.amazonaws.com/";
    private final AmazonS3 s3Client;

    public String uploadImageFile(MultipartFile file) {

        log.debug("we are in here trying to upload this image ", file.getName());
        File convertedFile = convertMultiPartFileToFile(file);
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, convertedFile));
        convertedFile.delete();
        return BUCKET_URL_ENDPOINT + fileName;
    }

    @Override
    public String updateProfilePicture(MultipartFile file, String oldPath) {
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

    public String deleteFile(String fileName) {
        if (fileName.length() < 57) return null;
        String filepath = fileName.substring(57);
        log.info(filepath, " check current value should be without the url ");
        s3Client.deleteObject(bucketName, filepath);
        return filepath;
    }

    //convert multipart file to normal file
    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(
                Objects.requireNonNull(file.getOriginalFilename())
        );
        try (FileOutputStream fileOutputStream = new FileOutputStream(convertedFile)) {
            fileOutputStream.write(file.getBytes());
        } catch (IOException ex) {
            log.error(MessageFormat
                    .format("Error while converting file {0}  and error {1}",
                            file.getOriginalFilename(),
                            ex));
        }
        return convertedFile;
    }


}
