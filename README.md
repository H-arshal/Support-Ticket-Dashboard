# 🎟️ DeskPro Ticket Manager

A modern, responsive, and robust full-stack Customer Support Ticket Management application. Built with a premium glassmorphic UI, powered by a Spring Boot backend, and backed by a MySQL database.

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 (Vite)
- TypeScript
- Tailwind CSS v4 (Custom Dark Theme & Glassmorphism)
- React Router (Routing)
- TanStack Query (Data Fetching & Caching)
- React Hook Form + Zod (Validation)
- Lucide React (Icons)

**Backend:**
- Java 21
- Spring Boot 3.4
- Spring Data JPA
- Flyway (Database Migrations)
- Mockito & JUnit 5 (Testing)

**Database & Infrastructure:**
- MySQL 8.0 (Docker for Local, Aiven Cloud for Production)
- Docker Compose

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- Java 21
- Docker Desktop

### 1. Database Setup
Start the local MySQL database using Docker Compose. This maps to port `3307` to avoid conflicts.
```bash
docker-compose up -d
```

### 2. Backend Setup
Navigate to the `backend` directory and run the Spring Boot application. Flyway will automatically run the migrations and seed 25 initial tickets.
```bash
cd backend
./mvnw spring-boot:run
```
*(The API will be available at `http://localhost:8080/api`)*

### 3. Frontend Setup
Navigate to the `frontend` directory, install dependencies, and run the development server.
```bash
cd frontend
npm install
npm run dev
```
*(The UI will be available at `http://localhost:5173`)*

---

## ☁️ Aiven Cloud Database Setup (Production)

To connect the application to your Aiven MySQL Cloud database instead of local Docker, simply override the Spring Boot environment variables.

You can run the backend with the Aiven variables like this:
```bash
export DB_HOST=mysql-ticket-manager-ticketmanager-01.d.aivencloud.com
export DB_PORT=25970
export DB_USERNAME=avnadmin
export DB_PASSWORD=your_aiven_password

./mvnw spring-boot:run
```
*Note: Aiven requires SSL, which is already configured in the Spring Boot connection string.*

---

## 🧠 Design Decisions & Assumptions

- **Architecture:** Layered monolith for the backend (Controller -> Service -> Repository). This ensures clear separation of concerns and makes testing straightforward.
- **Dynamic Filtering:** Implemented Spring Data JPA `Specification` to allow for clean, dynamic filtering by status, priority, and searching by title/email in a single database query.
- **Optimized Frontend Data Fetching:** Utilized `@tanstack/react-query` for automatic cache invalidation and UI state management. When a ticket is updated, the queries silently re-fetch in the background, providing a seamless UX without page reloads.
- **Error Handling:** Built a global `@ExceptionHandler` in Spring Boot to ensure standard JSON responses (e.g. `400 Bad Request`, `404 Not Found`) and prevent internal stack traces from leaking to the frontend.
- **Premium Aesthetics:** Chose to implement a custom Tailwind CSS configuration using glassmorphism (`backdrop-blur`) instead of standard component libraries. This provides a significantly more modern and premium feel.

---

## 🧪 Testing

To run the backend unit tests:
```bash
cd backend
./mvnw test
```
The test suite covers:
1. Controller validation (missing fields, invalid emails).
2. Service logic and dynamic query combinations using Mockito.
