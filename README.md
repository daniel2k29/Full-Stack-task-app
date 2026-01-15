# Full-Stack Task Management App

A simple task management web application built with **React (Vite + Tailwind CSS)** for the frontend, **Node.js + Express + TypeScript** for the backend, **Prisma + PostgreSQL** for the database, and **JWT authentication**.  

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
    1. [Prerequisites](#prerequisites)
    2. [Backend setup](#backend-setup)
    3. [Frontend setup](#frontend-setup)
    4. [Run with Docker](#run-with-docker)
4. [Environment Variables](#environment-variables)
5. [API Documentation](#api-documentation)
6. [Testing](#testing)
7. [Docker & DevOps](#docker--devops)

---

## Features
- User authentication (signup/login/logout) with JWT  
- Create, Read, Update, Delete (CRUD) tasks  
- Users can only access their own tasks  
- Responsive frontend with Vite + Tailwind CSS  
- Unit & integration tests for backend  

---

## Tech Stack
**Frontend:** React + Vite + Tailwind CSS  
**Backend:** Node.js + Express + TypeScript  
**Database:** PostgreSQL + Prisma ORM  
**Authentication:** JWT  
**Testing:** Jest + Supertest  
**Containerization:** Docker + Docker Compose  

---

## Setup Instructions

### Prerequisites
- Node.js >= 20.19 (or 22+)  
- PostgreSQL installed and running  
- npm or yarn  
-git clone https://github.com/daniel2k29/Full-Stack-task-app.git


### Backend setup
cd backend
npm install
cp .env.example .env  # create your environment file
# Fill in your DATABASE_URL and JWT_SECRET
npm run dev

### Frontend setup
cd frontend
npm install
npm run dev

### Run with Docker 
- Stop running backend and frontend server before proceeding with 
docker compose up --build

---

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

- `DATABASE_URL`: Your PostgreSQL database connection string (e.g., `postgresql://username:password@localhost:5432/database_name`)
- `JWT_SECRET`: A secret key for signing JWT tokens (use a long, random string)

---

## API Documentation
### Auth Endpoints

| Method | Endpoint       | Auth | Body                        | Response        |
| ------ | -------------- | ---- | --------------------------- | --------------- |
| POST   | /auth/register | No   | `{ name, email, password }` | `{ id, token }` |
| POST   | /auth/login    | No   | `{ email, password }`       | `{ token }`     |

### Task Endpoints
| Method | Endpoint   | Auth | Body                                   | Response                                 |
| ------ | ---------- | ---- | -------------------------------------- | ---------------------------------------- |
| POST   | /tasks     | Yes  | `{ title, description }`               | Created task object `{ id, title, ... }` |
| GET    | /tasks     | Yes  | -                                      | Array of tasks `[ {...}, {...} ]`        |
| GET    | /tasks/:id | Yes  | -                                      | Task object `{ id, title, ... }`         |
| PUT    | /tasks/:id | Yes  | `{ title?, description?, completed? }` | Updated task object                      |
| DELETE | /tasks/:id | Yes  | -                                      | `{ message: "Deleted" }`                 |

---

## Testing

cd backend
npm run test

--- 

## Docker & DevOps

### Docker Setup

docker compose up --build
