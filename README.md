# Task Management Portal

A premium Full Stack Task Management Portal built using **React.js**, **Node.js (Express)**, and **MySQL**. This application features a modern, user-friendly responsive dashboard (with dark mode support), JWT-based user authentication, interactive widgets for task statistics, and advanced controls for task searching, filtering, sorting, and pagination.

---

## Technical Stack

- **Frontend**: React.js, React Router DOM, Axios, Context API, Tailwind CSS, Lucide React (Icons), React Hot Toast
- **Backend**: Node.js, Express.js, MySQL (using `mysql2/promise` pool), JSON Web Token (JWT), BCrypt.js
- **Database**: MySQL
- **Testing**: Jest (Unit Testing), Supertest (API Testing)

---

## Folder Structure

```
TASK/
├── backend/
│   ├── config/              # Database connection pools
│   ├── controllers/         # Request handling logic
│   ├── middleware/          # Auth, global error handler, validations
│   ├── models/              # Database queries (User, Task)
│   ├── routes/              # Routing layers (/api/auth, /api/tasks)
│   ├── tests/               # Backend Jest test cases
│   ├── .env                 # Local configuration variables
│   ├── app.js               # Express application initialization
│   └── server.js            # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI elements (Navbar, Sidebar, Cards, etc.)
│   │   ├── pages/           # Login, Dashboard, AddTask, EditTask
│   │   ├── services/        # HTTP API Clients (Axios interceptor)
│   │   ├── context/         # AuthContext, ThemeContext (Dark Mode)
│   │   ├── routes/          # ProtectedRoute guard
│   │   ├── __tests__/       # Component unit tests (Jest & RTL)
│   │   ├── App.jsx          # Route controller
│   │   ├── index.css        # Tailwind directive & Google fonts
│   │   └── main.jsx         # React application entry point
│   ├── tailwind.config.js   # Tailwind custom theme setup
│   └── postcss.config.js
│
├── schema.sql               # Database creation script
└── Task_Management_Portal.postman_collection.json # API collection for Postman
```

---

## Installation & Setup Steps

### 1. Database Setup
1. Ensure your MySQL server (e.g. via XAMPP) is running.
2. Open a terminal and run the database initialization script:
   ```bash
   mysql -u root < schema.sql
   ```
   *This creates the database `task_portal_db` and the required `users` and `tasks` tables.*

### 2. Backend Configuration
1. Open a terminal and change to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by creating a `.env` file in the `backend/` folder:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=            # Leave empty if using XAMPP default
   DB_NAME=task_portal_db
   JWT_SECRET=supersecretkeyfortaskmanagementportal123
   JWT_EXPIRES_IN=24h
   NODE_ENV=development
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The API will be available at `http://localhost:5000`.*

### 3. Frontend Configuration
1. Open a new terminal window and change to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the frontend Vite development server:
   ```bash
   npm run dev
   ```
   *Open `http://localhost:5173` in your browser to view the application.*

---

## Running Tests

### Backend Tests
To run backend health check and route tests, execute the following in the `backend` folder:
```bash
npm test
```

### Frontend Tests
To run frontend Jest component tests, execute the following in the `frontend` folder:
```bash
npm test
```

---

## API Documentation

All protected endpoints require a `Bearer <jwt_token>` header in the request.

### Authentication APIs

#### 1. Register User
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### 2. Login User
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

---

### Task APIs (JWT Protected)

#### 1. Get All Tasks
- **Endpoint**: `GET /api/tasks`
- **Query Parameters**:
  - `status` (Optional): Filter by `Pending`, `In Progress`, or `Completed`
  - `search` (Optional): Query text matched against task title and description
  - `sort` (Optional): Sort by created date (`asc` or `desc`). Defaults to `desc`
  - `page` (Optional): Page index (Default: `1`)
  - `limit` (Optional): Items per page (Default: `5`)
- **Response** (200 OK):
  ```json
  {
    "tasks": [
      {
        "id": 1,
        "title": "Build Login Page",
        "description": "Create a responsive login page with validation and authentication support.",
        "status": "Pending",
        "created_at": "2026-06-20T08:30:00.000Z",
        "updated_at": "2026-06-20T08:30:00.000Z",
        "user_id": 1
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
  ```

#### 2. Get Statistics
- **Endpoint**: `GET /api/tasks/stats`
- **Response** (200 OK):
  ```json
  {
    "total": 1,
    "pending": 1,
    "inProgress": 0,
    "completed": 0
  }
  ```

#### 3. Create Task
- **Endpoint**: `POST /api/tasks`
- **Request Body**:
  ```json
  {
    "title": "Build Login Page",
    "description": "Create a responsive login page with validation and authentication support.",
    "status": "Pending"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "message": "Task created successfully",
    "taskId": 1
  }
  ```

#### 4. Update Task
- **Endpoint**: `PUT /api/tasks/:id`
- **Request Body**:
  ```json
  {
    "title": "Build Login Page",
    "description": "Updated description that is at least twenty characters long.",
    "status": "Completed"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "message": "Task updated successfully",
    "task": {
      "id": 1,
      "title": "Build Login Page",
      "description": "Updated description that is at least twenty characters long.",
      "status": "Completed",
      "user_id": 1
    }
  }
  ```

#### 5. Delete Task
- **Endpoint**: `DELETE /api/tasks/:id`
- **Response** (200 OK):
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

## Git Commit Examples

Below are standard commit messages mapping the execution history:
- `feat: initial project setup`
- `feat: implemented authentication APIs`
- `feat: implemented task APIs`
- `feat: added React Dashboard`
- `feat: integrated frontend with backend`
- `feat: added pagination and search`
- `feat: added dark mode`
- `docs: updated README`

---

## Assumptions & Design Choices

1. **Authentication State Persistence**: User details and JWT are stored in browser local storage and loaded into standard React context at app bootstrap. The client automatically invalidates sessions on API 401 token failure.
2. **Cascading Deletions**: In the MySQL schema, the database is configured to cascade deletions (`ON DELETE CASCADE`) from users to tasks. Deleting a user will automatically clean up all associated tasks.
3. **Validations**: Form fields validate characters locally in real-time (e.g. description minimum 20 characters) and the backend mirrors these validations as middleware to ensure data integrity.
