// src/main/java/com/example/suppliermanagement/service/ExcelService.java

package com.example.suppliermanagement.service;

import com.example.suppliermanagement.model.Approver;
import com.example.suppliermanagement.model.Supplier;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExcelService {

    public void generateExcelWithSuppliersAndApprovers(
            List<Supplier> suppliers,
            List<Approver> approvers,  // ← Accept both lists
            HttpServletResponse response) throws IOException {

        // Create new workbook
        Workbook workbook = new XSSFWorkbook();

        // ========================
        // 📄 SHEET 1: Suppliers
        // ========================
        Sheet supplierSheet = workbook.createSheet("Suppliers");

        // Create header row for Suppliers
        Row supplierHeader = supplierSheet.createRow(0);
        String[] supplierColumns = {
            "ID", "Supplier Name", "Street", "Line2", "Line3", "City", "Postal Code",
            "Country", "Region", "First Name", "Last Name", "Email", "Phone",
            "Category", "Info Region", "Additional Info"
        };

        for (int i = 0; i < supplierColumns.length; i++) {
            Cell cell = supplierHeader.createCell(i);
            cell.setCellValue(supplierColumns[i]);
            // Optional: style header
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);
            cell.setCellStyle(headerStyle);
        }

        // Fill data rows for Suppliers
        int supplierRowIndex = 1;
        for (Supplier s : suppliers) {
            Row row = supplierSheet.createRow(supplierRowIndex++);
            row.createCell(0).setCellValue(s.getId() != null ? s.getId() : 0L);
            row.createCell(1).setCellValue(s.getSupplierName() != null ? s.getSupplierName() : "");
            row.createCell(2).setCellValue(s.getStreet() != null ? s.getStreet() : "");
            row.createCell(3).setCellValue(s.getLine2() != null ? s.getLine2() : "");
            row.createCell(4).setCellValue(s.getLine3() != null ? s.getLine3() : "");
            row.createCell(5).setCellValue(s.getCity() != null ? s.getCity() : "");
            row.createCell(6).setCellValue(s.getPostalCode() != null ? s.getPostalCode() : "");
            row.createCell(7).setCellValue(s.getCountry() != null ? s.getCountry() : "");
            row.createCell(8).setCellValue(s.getRegion() != null ? s.getRegion() : "");
            row.createCell(9).setCellValue(s.getFirstName() != null ? s.getFirstName() : "");
            row.createCell(10).setCellValue(s.getLastName() != null ? s.getLastName() : "");
            row.createCell(11).setCellValue(s.getEmail() != null ? s.getEmail() : ""); // Uses @JsonProperty("email")
            row.createCell(12).setCellValue(s.getPhone() != null ? s.getPhone() : "");   // Uses @JsonProperty("phone")
            row.createCell(13).setCellValue(s.getCategory() != null ? s.getCategory() : "");
            row.createCell(14).setCellValue(s.getInfoRegion() != null ? s.getInfoRegion() : "");
            row.createCell(15).setCellValue(s.getAdditionalInfo() != null ? s.getAdditionalInfo() : "");
        }

        // Auto-size columns for Suppliers sheet
        for (int i = 0; i < supplierColumns.length; i++) {
            supplierSheet.autoSizeColumn(i);
        }

        // ========================
        // 📄 SHEET 2: Approvers
        // ========================
        Sheet approverSheet = workbook.createSheet("Approvers");

        // Create header row for Approvers
        Row approverHeader = approverSheet.createRow(0);
        String[] approverColumns = {
            "ID", "Name", "Email", "Level", "Country"
        };

        for (int i = 0; i < approverColumns.length; i++) {
            Cell cell = approverHeader.createCell(i);
            cell.setCellValue(approverColumns[i]);
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);
            cell.setCellStyle(headerStyle);
        }

        // Fill data rows for Approvers
        int approverRowIndex = 1;
        for (Approver a : approvers) {
            Row row = approverSheet.createRow(approverRowIndex++);
            row.createCell(0).setCellValue(a.getId() != null ? a.getId() : 0L);
            row.createCell(1).setCellValue(a.getName() != null ? a.getName() : "");
            row.createCell(2).setCellValue(a.getEmail() != null ? a.getEmail() : "");
            row.createCell(3).setCellValue(a.getLevel() != null ? a.getLevel() : 0);
            row.createCell(4).setCellValue(a.getCountry() != null ? a.getCountry() : "");
        }

        // Auto-size columns for Approvers sheet
        for (int i = 0; i < approverColumns.length; i++) {
            approverSheet.autoSizeColumn(i);
        }

        // ========================
        // 📤 FINAL: Write to Response
        // ========================

        // Generate filename with timestamp
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String filename = "Suppliers_And_Approvers_" + timestamp + ".xlsx";

        // Set response headers
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=" + filename);

        // Write workbook to output stream
        workbook.write(response.getOutputStream());
        workbook.close();
    }
}