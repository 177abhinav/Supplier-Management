// src/main/java/com/example/suppliermanagement/service/ExcelService.java

package com.example.suppliermanagement.service;

import com.example.suppliermanagement.model.Supplier;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelService {

    // Static approvers (as defined in your React code)
    private static final List<Approver> STATIC_APPROVERS = List.of(
        new Approver("Rajasekhar", "rkirlampudi@answerthink.com", 1, "India"),
        new Approver("kumaresh", "kumaresh.ramadoss@answerthink.com", 1, "Canada")
    );

    public void generateExcelWithSuppliersAndApprovers(List<Supplier> suppliers, HttpServletResponse response) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Suppliers & Approvers");

        // Create header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {
            "Supplier Name", "Contact First Name", "Contact Last Name", "Email", "Phone",
            "City", "Country", "Category", "Status",
            "Approver Name", "Approver Email", "Approver Level", "Approver Country"
        };

        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 12);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Write supplier data + approvers (each supplier repeated for each approver)
        int rowNum = 1;
        for (Supplier supplier : suppliers) {
            for (Approver approver : STATIC_APPROVERS) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(supplier.getSupplierName() != null ? supplier.getSupplierName() : "");
                row.createCell(1).setCellValue(supplier.getFirstName() != null ? supplier.getFirstName() : "");
                row.createCell(2).setCellValue(supplier.getLastName() != null ? supplier.getLastName() : "");
                row.createCell(3).setCellValue(supplier.getEmail() != null ? supplier.getEmail() : "");



                // Add approver info
                row.createCell(9).setCellValue(approver.name);
                row.createCell(10).setCellValue(approver.email);
                row.createCell(11).setCellValue(approver.level);
                row.createCell(12).setCellValue(approver.country);
            }
        }

        // Auto-size columns
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Set response headers
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=suppliers_with_approvers.xlsx");

        // Write to output stream
        workbook.write(response.getOutputStream());
        workbook.close();
    }

    // Inner class to hold approver data
    public static class Approver {
        public String name;
        public String email;
        public int level;
        public String country;

        public Approver(String name, String email, int level, String country) {
            this.name = name;
            this.email = email;
            this.level = level;
            this.country = country;
        }
    }
}