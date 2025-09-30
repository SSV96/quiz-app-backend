# Quiz App Backend

A **NestJS** backend for a Quiz application, using **Prisma** for database management. This service provides APIs for creating, updating, and fetching quizzes and questions. Designed to be run in a Docker container.

---

## Features

- CRUD operations for quizzes and questions
- Prisma ORM for database management
- Dockerized for easy deployment
- Ready for production with migrations on startup
- TypeScript & NestJS architecture

---

## Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)  
- **Database ORM:** [Prisma](https://www.prisma.io/)  
- **Database:** MySQL / PostgreSQL (configurable via `.env`)  
- **Containerization:** Docker  
- **Language:** TypeScript

---

## Getting Started

### Prerequisites

- Node.js >= 22
- Docker (optional for containerized deployment)
- Database (MySQL, PostgreSQL, or SQLite for local dev)

### Environment Variables

Create a `.env` file at the root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quizdb?schema=public"
PORT=3002
