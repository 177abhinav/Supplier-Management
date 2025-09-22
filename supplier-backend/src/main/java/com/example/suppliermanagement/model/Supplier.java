package com.example.suppliermanagement.model;

import jakarta.persistence.*;
import lombok.Setter;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @JsonProperty("supplierName")
    private String supplierName;

    private String street;
    private String line2;
    private String line3;
    private String city;

    @Column(name = "postal_code")
    private String postalCode;
    
    private String country;
    private String region;

    @Column(name = "first_name")
    @JsonProperty("firstName")
    private String firstName;
    
    @Column(name = "last_name")
    @JsonProperty("lastName")
    private String lastName;

    @Column(name = "contact_email")
    @JsonProperty("email") // ← Used during deserialization
    private String contactEmail;
    
    @Column(name = "contact_phone")
    @JsonProperty("phone") // ← Used during deserialization
    private String contactPhone;

    private String category;
    
    @Column(name = "info_region")
    @JsonProperty("infoRegion")
    private String infoRegion;
    
    @Column(name = "additional_info")
    @JsonProperty("additionalInfo")
    private String additionalInfo;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attachment> attachments;

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
        if (attachments != null) {
            for (Attachment attachment : attachments) {
                attachment.setSupplier(this);
            }
        }
    }

    // ✅ ———— EXPLICIT GETTERS WITH @JsonProperty ———— ✅

    public Long getId() { return id; }
    public String getSupplierName() { return supplierName; }
    public String getStreet() { return street; }
    public String getLine2() { return line2; }
    public String getLine3() { return line3; }
    public String getCity() { return city; }
    public String getPostalCode() { return postalCode; }
    public String getCountry() { return country; }
    public String getRegion() { return region; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }

    @JsonProperty("email") // ✅ This controls SERIALIZATION → maps to "email" in JSON
    public String getEmail() {
        return this.contactEmail;
    }

    @JsonProperty("phone") // ✅ This controls SERIALIZATION → maps to "phone" in JSON
    public String getPhone() {
        return this.contactPhone;
    }

    public String getCategory() { return category; }
    public String getInfoRegion() { return infoRegion; }
    public String getAdditionalInfo() { return additionalInfo; }
    public List<Attachment> getAttachments() { return attachments; }
}