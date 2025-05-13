# 🐳 Backend — Dockerized Express.js + PostgreSQL + Prisma API

This is a minimal, production-ready backend service using:

- **Express.js** — Fast, unopinionated Node.js web framework
- **Prisma ORM** — Type-safe and modern database toolkit
- **PostgreSQL** — Reliable and powerful relational database
- **Docker** — Containerization for easy setup and consistent environments

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/axmadvsss/mini-fullstack-project.git
cd mini-fullstack-project/backend
```

### 2. Start Services with Docker

Build and start the containers for both backend and PostgreSQL:

```bash
docker-compose up --build
```

### 3. Apply Prisma Migrations

Run the following command to generate tables based on your Prisma schema:

```bash
docker-compose exec backend npx prisma migrate dev --name init
```

---

## 📁 Project Structure

```text
backend/
├── prisma/
│   └── schema.prisma         # Database schema and models
├── src/
│   └── service.js            # Express app and API endpoints
├── Dockerfile                # Backend container definition
├── docker-compose.yml        # Multi-service Docker config
└── .env                      # Environment variables (e.g. database credentials)
```

---

## 📡 API Endpoints

| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| GET    | `/users`       | Fetch all users        |
| POST   | `/users`       | Create a new user      |
| PUT    | `/users/:id`   | Update a user by ID    |
| DELETE | `/users/:id`   | Delete a user by ID    |

> ⚠️ Ensure PostgreSQL is running in Docker before making API calls.

---

## 🌍 Base URL

```txt
http://localhost:5050
```

---

## 🧪 Example Request

### POST /users

```json
{
  "name": "Ali",
  "email": "ali@example.com"
}
```

---

## 📜 License

Licensed under the **MIT License** — you're free to use, modify, and distribute this project.

---

## 👤 Author

Built with ❤️ by **Madamin Axmadov**, 2025
