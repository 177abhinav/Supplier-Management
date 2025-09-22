# Supplier Management Backend

This is a Spring Boot backend for Supplier Management, integrated with MySQL. It exposes a REST API endpoint `/api/submit` to accept supplier form data and save it to the database.

## Features
- Spring Boot + MySQL integration
- REST API endpoint `/api/submit` (POST)
- Supplier entity/model
- Application properties for MySQL configuration

## Setup Instructions
1. Ensure MySQL is running and accessible.
2. Update `src/main/resources/application.properties` with your MySQL credentials.
3. Build and run the Spring Boot application.

## API
- `POST /api/submit`: Accepts supplier form data (supplier details, contact details, category, attachments as file metadata) and saves to MySQL.

## Folder Structure
- `src/main/java/com/example/suppliermanagement/` - Java source code
- `src/main/resources/` - Application properties

## Next Steps
- Implement Supplier entity/model
- Implement REST controller
- Configure MySQL connection

---
This backend is designed to integrate with the React frontend in `supply-ui/`.
