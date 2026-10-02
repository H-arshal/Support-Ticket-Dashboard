# 🎟️ Support Ticket Dashboard

A modern, responsive, and robust full-stack Customer Support Ticket Management application. Built with a premium "Enterprise Minimal" UI, powered by a Spring Boot backend, and backed by a MySQL database.

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 (Vite)
- TypeScript
- Tailwind CSS v4 (Enterprise Minimal Theme)
- React Router (Routing)
- TanStack Query (Data Fetching & Caching)
- Lucide React (Icons)

**Backend:**
- Java 21
- Spring Boot 3.4
- Spring Data JPA
- Flyway (Database Migrations)
- Mockito & JUnit 5 (Testing)

**Database & Infrastructure:**
- MySQL 8.0
- Docker & Docker Compose (Multi-container architecture)

---

## 🚀 Getting Started (Docker Compose)

The easiest way to run the entire stack (Frontend, Backend, and Database) is using Docker Compose.

### Prerequisites
- Docker & Docker Compose installed on your machine.

### Run the Application
From the root of the repository, simply run:
```bash
docker compose up --build -d
```
- The **Frontend** will be accessible at: `http://localhost:80`
- The **Backend API** will be accessible at: `http://localhost:8080/api`

Flyway will automatically run database migrations and inject 60 seed tickets into the database.

---

## ☁️ Aiven Cloud Database Setup (Production)

To connect the application to your production Aiven MySQL Cloud database instead of the local Docker container:

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your Aiven credentials in the `.env` file.
3. Restart Docker Compose:
   ```bash
   docker compose down
   docker compose up -d
   ```
The backend will automatically detect the `.env` file and route all traffic and migrations to your Aiven database.

---

## 🧠 Design Decisions & Assumptions

- **Architecture:** Layered monolith for the backend (Controller -> Service -> Repository). This ensures clear separation of concerns and makes testing straightforward.
- **Dynamic Filtering:** Implemented Spring Data JPA `Specification` to allow for clean, dynamic filtering by status, priority, and searching by title/email in a single database query.
- **Optimized Frontend Data Fetching:** Utilized `@tanstack/react-query` for automatic cache invalidation and UI state management. When a ticket is updated, the queries silently re-fetch in the background.
- **Premium Aesthetics:** Implemented an "Enterprise Minimal" design system with sharp 90-degree corners, extremely tight padding for data density, and a custom interactive ticket statistics bar.
- **Sorting Integration:** Full-stack sorting implementation allowing users to instantly re-order the ticket table by any column, seamlessly handled natively by the database using Spring Data `PageRequest`.

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
