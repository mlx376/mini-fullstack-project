# ⚛️ React Frontend — Vite + Axios + React Hook Form + SCSS + Toastify

This project is a simple and clean React frontend designed for user CRUD operations, built with:

- **React** — component-based UI library
- **Axios** — promise-based HTTP client
- **React Hook Form** — flexible form handler
- **Yup** — schema-based validation
- **Sass (SCSS)** — modern CSS preprocessor
- **React Toastify** — elegant toast notifications

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/axmadvsss/mini-fullstack-project.git
cd mini-fullstack-project/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Dev Server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173) (or whatever port Vite uses)

> ⚠️ Ensure the backend is running at `http://localhost:5050`

---

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── api/axios.js         # Axios instance with base URL
│   ├── pages/Users.jsx      # Main UI for user CRUD
│   ├── styles/main.scss     # Global SCSS styles
│   ├── App.jsx              # Main layout and routes
│   └── main.jsx             # Entry point for React app
├── public/
│   └── ...                  # Static files
├── index.html               # Main HTML entry
└── vite.config.js           # Vite configuration
```

---

## 📡 API Endpoints

| Method | Endpoint        | Description       |
|--------|------------------|-------------------|
| GET    | `/users`         | Fetch all users   |
| POST   | `/users`         | Create a new user |
| PUT    | `/users/:id`     | Update user       |
| DELETE | `/users/:id`     | Delete user       |

---

## 🧪 Sample Request Body

```json
{
  "name": "Ali",
  "email": "ali@example.com"
}
```

---

## 📸 UI Preview

![User Interface Screenshot](../frontend/ui-photo.png)

---

## 📜 License

Licensed under the **MIT License** — use it freely for learning or production.

---

## 👨‍💻 Author

Created with ❤️ by **Madamin Axmadov**, 2025
