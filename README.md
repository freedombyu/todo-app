# Personal Todo List Application

A full-stack todo list application built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status (all, active, completed)
- Real-time statistics
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todoapp
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   npx serve public
   ```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a single task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion