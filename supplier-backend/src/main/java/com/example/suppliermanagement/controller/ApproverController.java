// src/main/java/com/example/suppliermanagement/controller/ApproverController.java
package com.example.suppliermanagement.controller;

import com.example.suppliermanagement.model.Approver;
import com.example.suppliermanagement.repository.ApproverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5174")
public class ApproverController {

    @Autowired
    private ApproverRepository approverRepository;

    @GetMapping("/approvers")
    public List<Approver> getAllApprovers() {
        return approverRepository.findAll();
    }

    @PostMapping("/approvers")
    public ResponseEntity<Approver> createApprover(@RequestBody Approver approver) {
        Approver saved = approverRepository.save(approver);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/approvers/{id}")
    public ResponseEntity<Approver> updateApprover(@PathVariable Long id, @RequestBody Approver approverDetails) {
        return approverRepository.findById(id)
            .map(approver -> {
                approver.setName(approverDetails.getName());
                approver.setEmail(approverDetails.getEmail());
                approver.setLevel(approverDetails.getLevel());
                approver.setCountry(approverDetails.getCountry());
                Approver updated = approverRepository.save(approver);
                return ResponseEntity.ok(updated);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}