// src/main/java/com/example/suppliermanagement/controller/SupplierController.java

package com.example.suppliermanagement.controller;

import com.example.suppliermanagement.model.Approver;
import com.example.suppliermanagement.model.Supplier;
import com.example.suppliermanagement.repository.ApproverRepository;
import com.example.suppliermanagement.repository.SupplierRepository;
import com.example.suppliermanagement.service.ExcelService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5174") // Allow frontend
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ApproverRepository approverRepository; // ← Add this line

    @Autowired
    private ExcelService excelService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitSupplier(@RequestBody Supplier supplier) {
        // Set the bidirectional relationship for attachments before saving
        if (supplier.getAttachments() != null) {
            supplier.getAttachments().forEach(attachment -> attachment.setSupplier(supplier));
        }
        supplierRepository.save(supplier);
        return ResponseEntity.ok("Form submitted successfully");
    }

    @GetMapping("/suppliers")
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    // ✅ NEW: Get single supplier by ID
    @GetMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
        return supplierRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/download-excel")
    public void downloadExcel(HttpServletResponse response) throws IOException {
        List<Supplier> suppliers = supplierRepository.findAll();
        List<Approver> approvers = approverRepository.findAll(); // ← Add this line

    excelService.generateExcelWithSuppliersAndApprovers(suppliers, approvers, response); // ← Pass both
    }
}