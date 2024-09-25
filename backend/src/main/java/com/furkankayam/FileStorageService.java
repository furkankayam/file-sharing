package com.furkankayam;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileStorageService {

    public static final String STORAGE_DIRECTORY = "/app/videos";

    public void saveFile(MultipartFile fileToSave) throws IOException {
        if (fileToSave == null) {
            throw new NullPointerException("fileToSave null");
        }

        File storageDir = new File(STORAGE_DIRECTORY);
        if (!storageDir.exists()) {
            boolean created = storageDir.mkdirs();
            if (!created) {
                throw new IOException("Depolama dizini oluşturulamadı: " + STORAGE_DIRECTORY);
            }
        }

        var targetFile = new File(STORAGE_DIRECTORY + File.separator + fileToSave.getOriginalFilename());

        if (!Objects.equals(targetFile.getParent(), STORAGE_DIRECTORY)) {
            throw new SecurityException("Desteklenmeyen dosya adı!");
        }
        Files.copy(fileToSave.getInputStream(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }

    public File getDownloadFile(String fileName) throws FileNotFoundException {
        if (fileName == null) {
            throw new NullPointerException("fileName null");
        }
        var fileToDownload = new File(STORAGE_DIRECTORY + File.separator + fileName);
        if (!Objects.equals(fileToDownload.getParent(), STORAGE_DIRECTORY)) {
            throw new SecurityException("Desteklenmeyen dosya adı!");
        }
        if (!fileToDownload.exists()) {
            throw new FileNotFoundException("Böyle bir dosya yok: " + fileName);
        }
        return fileToDownload;
    }
}
