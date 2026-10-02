<div align="center">
  <img src="https://img.icons8.com/color/120/000000/ticket.png" alt="Ticket Logo"/>
  <h1>DeskPro | Support Ticket Dashboard</h1>
  <p><strong>A highly-optimized, enterprise-grade full-stack customer support ticket management application.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=java&logoColor=white" alt="Java 21" />
    <img src="https://img.shields.io/badge/Spring_Boot-3.4-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot" />
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </p>
</div>

---

## 📖 Overview

DeskPro is a robust internal tool built for customer support teams to rapidly create, track, and resolve support requests. It completely replaces messy spreadsheet workflows with a blazing-fast, data-dense, and highly organized "Enterprise Minimal" user interface.

This project was developed by **Harshal** as a comprehensive technical assignment showcasing full-stack proficiency, database design, API architecture, and modern UX principles.

---

## ⚡ Features

- **Blazing Fast Data Grid:** Instantly sort, filter, and search through thousands of tickets with zero layout shift.
- **Enterprise Minimal UX:** Features sharp 90-degree corners, extremely tight data padding for maximum screen real estate, and a custom interactive statistics bar.
- **Full-Stack Pagination & Sorting:** Handled natively at the database level using Spring Data `PageRequest` and `Specification` for massive scalability.
- **Optimized Caching:** Powered by `@tanstack/react-query`, ensuring the UI reflects changes instantly via background cache invalidation without full page reloads.
- **Automated Deployments:** Fully containerized via Docker with `render.yaml` orchestration for one-click cloud deployments.

---

## 🏗️ Architecture & Tech Stack

### 🎨 Frontend (Client)
- **Framework:** React 18 (Bootstrapped with Vite for instant HMR)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS v4 (Custom Enterprise Minimal design system)
- **State Management:** TanStack Query v5
- **Routing:** React Router v6
- **Icons:** Lucide React

### ⚙️ Backend (API Server)
- **Framework:** Spring Boot 3.4
- **Language:** Java 21
- **Persistence:** Spring Data JPA / Hibernate
- **Database Migrations:** Flyway (Automatically seeds 60 diverse tickets on startup)
- **Testing:** JUnit 5, Mockito

### ☁️ Infrastructure
- **Database:** MySQL 8.0 (Containerized locally, Aiven Cloud in Production)
- **Deployment:** Docker & Docker Compose

---

## 🚀 Local Development Setup

The absolute easiest way to run the entire stack (Frontend, Backend, and Database) is using Docker Compose.

### Prerequisites
- Docker & Docker Compose installed on your machine.

### Run the Stack
From the root of the repository, execute:
```bash
docker compose up --build -d
```
Once the containers are up:
- 🖥️ **Frontend App:** `http://localhost:80`
- 🔌 **Backend API:** `http://localhost:8080/api`

*Note: Flyway will automatically run database migrations and inject 60 seed tickets into the database upon startup.*

---

## ☁️ Production Deployment (Aiven & Render)

This application is configured for one-click deployment using Render and an Aiven managed database.

1. **Configure the Database:**
   Copy the `.env.example` file to `.env` and fill in your Aiven MySQL credentials:
   ```bash
   cp .env.example .env
   ```
2. **Deploy via Render Blueprint:**
   Connect this repository to Render and create a new **Blueprint**. Render will automatically parse the included `render.yaml` file, prompt you for your Aiven password, and deploy both the Spring Boot API and React frontend as isolated, highly-available web services.

---

## 🧠 Design Decisions & Technical Choices

1. **Layered Monolith Architecture:** The backend strictly adheres to Controller -> Service -> Repository patterns. This ensures a clean separation of concerns and guarantees that business logic remains highly testable.
2. **Dynamic JPA Specifications:** Instead of writing dozens of custom `@Query` methods, I utilized Spring Data JPA `Specification` to allow for clean, dynamic filtering (by status, priority, and searching by title/email) in a single, highly-optimized database query.
3. **Global Exception Handling:** A global `@ControllerAdvice` handler intercepts all exceptions and returns standardized JSON error responses, preventing ugly internal stack traces from leaking to the frontend.
4. **Vite Build-Time Injection:** In the Dockerfile, `VITE_API_BASE_URL` is passed as a build argument to ensure the React static bundle safely compiles with the correct production API URL, completely eliminating CORS and networking issues.

---

## ⚠️ Known Limitations (Scope Tradeoffs)

In order to meet the strict time limitations of the assignment, the following conscious tradeoffs were made:
- **Authentication:** No JWT/OAuth authentication was implemented. The API is currently open for internal company usage.
- **File Attachments:** Tickets only support text descriptions. S3 bucket integration for file uploads was omitted.
- **Real-time Updates:** The frontend relies on React Query cache invalidation (polling/refetching on window focus) rather than WebSockets.

---

## ⏱️ Time Allocation

Total time spent was approximately **5.5 hours**, broken down as follows:
- **Project Setup & DB Migrations:** 45 mins
- **Spring Boot Backend Core (APIs, Specs, Validation):** 2 hours
- **React Frontend (Tailwind UI, React Query):** 2 hours
- **Testing, Docker Deployment, & Polish:** 45 mins

---

## 🤖 AI Tool Usage

An agentic AI coding assistant was utilized during this assignment to increase development velocity. Specifically, it was used to:
- Generate repetitive boilerplate code (e.g., Spring Boot DTOs and Flyway migration SQL scripts with seed data).
- Scaffold the Docker and Docker Compose orchestration files.
- Assist in rapidly laying out the Tailwind CSS UI components.
*All generated code was thoroughly reviewed, tested, and modified to ensure it strictly meets the architectural and quality standards required for this assignment.*

---

## 🧪 Testing

To run the backend unit test suite:
```bash
cd backend
./mvnw test
```
The test suite heavily utilizes Mockito and covers:
1. Controller-level validation (missing fields, invalid email formats).
2. Service logic and dynamic query combinations.

---

<div align="center">
  <p>Built with ❤️ by <strong>Harshal</strong></p>
</div>
