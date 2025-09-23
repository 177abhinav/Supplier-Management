package com.example.suppliermanagement.controller; // 👈 Replace with your package

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/suppliers")
public class AttachmentController {

    private static final String UPLOAD_DIR = "C:/Users/abhinav.maddenapalli/Downloads/Supplier-Management/supplier-backend/uploads";

    @GetMapping("/{id}/attachments/{filename:.+}")  // ✅ FIXED: removed "/api/suppliers"
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String id,
            @PathVariable String filename) {

        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(id).resolve(filename).normalize();
            File file = filePath.toFile();

            if (!file.exists() || !file.isFile()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            Resource resource = new FileSystemResource(file);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"");
            headers.add(HttpHeaders.CONTENT_TYPE, Files.probeContentType(filePath));

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(file.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}