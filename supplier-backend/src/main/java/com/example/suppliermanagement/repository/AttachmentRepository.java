package com.example.suppliermanagement.repository;

import com.example.suppliermanagement.model.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}
