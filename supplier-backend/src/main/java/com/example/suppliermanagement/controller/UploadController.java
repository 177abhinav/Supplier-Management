package com.example.suppliermanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "http://localhost:5174")
public class UploadController {

    private static final String UPLOAD_DIR = "C:/Users/abhinav.maddenapalli/Downloads/Supplier-Management/supplier-backend/uploads";

    @PostMapping("/{id}/upload")  // ✅ FIXED: removed "/api/suppliers"
    public ResponseEntity<String> uploadFile(
            @PathVariable String id,
            @RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            Path supplierDir = Paths.get(UPLOAD_DIR).resolve(id);
            Files.createDirectories(supplierDir);

            Path filePath = supplierDir.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), filePath);

            return ResponseEntity.ok("File uploaded: " + file.getOriginalFilename());

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }
}
