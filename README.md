# CampusCare

CampusCare is a full-stack student counselling and campus administration platform built with React, Vite, Express, and MongoDB. It helps students, teachers, HODs, and administrators manage academic counselling, appointments, tasks, profile updates, and role-based dashboards in a single system.

## Overview

The application is designed for a university environment where:

- Students can manage their profiles, counselling appointments, and academic tasks.
- Teachers can review assigned students, accept or reject appointments, and assign academic tasks.
- HODs can monitor department-level activity and manage staff/student oversight.
- Administrators can manage accounts, monitor role-based system usage, and maintain user records.
- Demo users are included for previewing each role without exposing real personal data.

## Features

### Student Features
- Secure login and role-aware dashboard access
- Profile editing and personal data update flow
- Appointment booking with department counsellors
- Academic task tracking with completion states
- Performance and activity overview
- Notifications for appointment status and task updates

### Teacher Features
- Dashboard for assigned students
- View pending appointments and student summaries
- Accept, reject, or reschedule counselling requests
- Assign academic tasks to students
- Track performance indicators and activity updates
- Notifications for new appointments and task-related updates

### HOD Features
- Department-level dashboard and staff overview
- Review status indicators for department records
- Quick visibility into teacher and student activity

### Admin Features
- Role-based account management
- Search, filter, and update user records
- Demo and real account separation
- Department and role statistics
- Account maintenance for student, teacher, HOD, and admin roles
- Update password controls in managed account workflows

### Common Features
- Role-based route protection
- JWT-based authentication
- Notification system with read/unread state
- MongoDB persistence for user, task, appointment, and notification data
- Demo credentials for login demos

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Lucide icons
- Tailwind CSS

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing

## Project Structure

```text
CampusCare/
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   └── data/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── package-lock.json
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or later
- npm
- MongoDB Atlas connection or a local MongoDB instance
- Git

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd CampusCare
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd server
npm install
```

## Environment Configuration

Create a `.env` file inside the `server` folder using the example file:

```bash
cd server
copy .env.example .env
```

Then update the values:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
```

> Do not commit your actual `.env` file to GitHub. It is already ignored by the repository.

## Running the Project

### Start the backend

From the project root:

```bash
npm run server
```

Or from the `server` folder:

```bash
cd server
npm run dev
```

### Start the frontend

From the project root:

```bash
npm run dev
```

The frontend is served by Vite on the default Vite port, usually:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:5000
```

## Demo Accounts

The project includes seeded demo accounts for quick testing and role previews.

| Role | Username | Password |
| --- | --- | --- |
| Admin | admin | password123 |
| Student Demo | demo-student | password123 |
| Teacher Demo | demo-teacher | password123 |
| HOD Demo | demo-hod | password123 |

The seeded student IDs follow the format:

```text
CSE-2026-001
CSE-2026-002
...
CSE-2026-020
```

## App Workflow

### Admin
- View total role counts and account summaries
- Manage department and staff records
- Create, edit, and delete user accounts
- Control account password updates in a secure flow
- View role-based filtering and management tables

### Teacher
- Review assigned students
- Accept or reject appointments
- Assign tasks to students
- View completion data and support trends

### HOD
- Monitor department performance and engagement
- Access department-level user activity

### Student
- Update profile information
- Book counselling sessions
- Track tasks and progress
- Receive appointment and task notifications

## Notes for GitHub Upload

Before uploading, ensure the following are in place:

- `.env` file is not committed
- `node_modules` is not committed
- MongoDB credentials are kept in local environment variables only
- `README.md` is updated with project usage and setup instructions

### Git commands for publishing to GitHub

```bash
git init
git add .
git commit -m "Initial CampusCare project setup"
git branch -M main
git remote add origin <your-github-repository-url>
git push -u origin main
```

## License

This project is currently distributed for academic/project use as provided. If you plan to publish it publicly, add your preferred license file such as MIT before release.

## Contact / Project Notes

This system was built as a role-based campus support platform and is ready for extension with additional modules such as:

- attendance reports
- faculty leave management
- academic counseling analytics
- student grievance workflows
- notifications and reminders automation

## Final Note

CampusCare is designed to be a practical, full-stack academic management system. It is suitable for demonstration, learning, portfolio projects, and real-world refinement with additional business logic and enhancements.
