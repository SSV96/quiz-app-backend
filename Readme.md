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
- **Database:** PostgreSQL (configurable via `.env`)  
- **Containerization:** Docker  
- **Language:** TypeScript

---

## Getting Started

### Prerequisites

- Node.js >= 22
- Docker (optional for containerized deployment)
- Database (MySQL, PostgreSQL, or SQLite for local dev)


## API Endpoints

| Method | Endpoint               | Description                                  |
|--------|------------------------|----------------------------------------------|
| POST   | /quizzes               | Create a new quiz                            |
| GET    | /quizzes               | Get all quizzes                              |
| GET    | /quizzes/:id           | Get quiz by ID                               |
| PUT    | /quizzes/:id           | Update a quiz (batch updates supported)      |
| POST   | /quizzes/:id/publish   | Publishes a quiz                             |
| DELETE | /quizzes/:id           | Delete a quiz                                |

> **Note:** Each quiz can contain multiple blocks (questions, headings, text).  
> Blocks can be updated in **batch transactions** to ensure consistency.

## Why Prisma?

Prisma is used because:

- Provides a **type-safe ORM** for TypeScript
- Easy database migrations and schema management
- Supports **transactions**, ideal for batch updates
- Works seamlessly with NestJS
- Generates Prisma Client for fast queries

---

## Quiz & QuizBlock Structure

### Quiz

- `id`: string (unique identifier)  
- `title`: string  
- `description`: string  
- `blocks`: array of `QuizBlock`  
- `createdAt`: timestamp  
- `updatedAt`: timestamp  

### QuizBlock

- `id`: string (unique)  
- `type`: enum (`QUESTION`, `HEADING`, `TEXT`)  
- `properties`: object  

#### For `QUESTION`:

- `kind`: enum (`SINGLE`, `MULTIPLE`)  
- `text`: string  
- `options`: array of `{ id, text }`  
- `correctOptionIds`: array of option IDs  

#### For `HEADING` / `TEXT`:

- `text`: string  

#### For `ButtonBlock` :

- `PreviousLabel`: string
- `NextLabel`: string
- `SubmitLabel`: string  

> Blocks are stored in a way that allows **batch updates and transactional operations**,  
> so updating multiple questions or properties in a quiz happens atomically.


# Setup for Development

1. Clone the Repository

```bash
git clone https://github.com/SSV96/quiz-app-be
cd quiz-app-be
```

2. Install Dependencies

```bash
npm install
```

3. Configure Environment Variables
   Create a .env file in the root directory:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/quizdb?schema=public"
PORT=3002
```

4. Run app in watch mode

```bash
npm run start:dev
```

5. Visit the following url in your browser

```bash
http://localhost:3002/api
```



<!-- 
```env

 you can use neon 


npm run start:dev in watch mode 


go to url /api

you can deploy app to railway cloud or render cloud -->