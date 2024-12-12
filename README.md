# Ticketing System

This project is a web-based ticketing system that allows users to purchase tickets, view their purchase history, and vendors to manage ticket pools and transactions.

---

## Technologies Used

- **Frontend**: Angular, Angular Material, WebSocket, TypeScript, RxJS
- **Backend**: Spring Boot, JPA, MySQL
- **Tools**: Maven, Swagger (API Documentation)

---

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js**
- **Angular CLI**
- **Java 17**
- **Maven**
- **MySQL/h2**
- **Docker**

---
## frontend setup


- **Node.js**
- **Angular CLI**
- **Java 17**
- **Maven**
- **MySQL/h2**
- **Docker**

1. before running:
   ```bash
   npm install

1. **Run project on  and it will display in localhost:4200**
   ```bash
   ng serve  

---
## Installation

### Backend Setup (Spring Boot)


1. Clone the repository:
   ```bash
   git clone git@github.com:Tharuka-Herath/TicketingSystem.git
   cd ticketing-system-backend

2.My sql from Docker:
   ```bash
   docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:latest

Build and run the backend:

    ```bash
mvn clean install
mvn spring-boot:run
