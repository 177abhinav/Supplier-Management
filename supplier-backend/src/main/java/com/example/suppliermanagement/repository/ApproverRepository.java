// src/main/java/com/example/suppliermanagement/repository/ApproverRepository.java
package com.example.suppliermanagement.repository;

import com.example.suppliermanagement.model.Approver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApproverRepository extends JpaRepository<Approver, Long> {
}