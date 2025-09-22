// src/main/java/com/example/suppliermanagement/model/Approver.java
package com.example.suppliermanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "approvers")
@Getter
@Setter
public class Approver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "level", nullable = false)
    private Integer level;

    @Column(name = "country", nullable = false)
    private String country;
}