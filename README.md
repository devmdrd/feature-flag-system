# Multi-Tenant Feature Flag Management System

A role-based platform where organizations can manage feature flags and check whether a feature is enabled or disabled.

## What It Does

- **Super Admin** — creates and manages organizations
- **Org Admin** — signs up under an organization, creates and toggles feature flags
- **End User** — selects an organization and checks whether a feature flag is enabled

## Tech Stack

- **Backend** — Node.js, Express, MySQL, Sequelize, JWT
- **Frontend** — Angular 20, three standalone apps

## Apps & Ports

| App | Role | Port |
|---|---|---|
| `super-admin` | Super Admin panel | 4200 |
| `admin` | Org Admin panel | 4201 |
| `user` | End User checker | 4202 |
| `backend` | REST API | 3000 |

## Folder Structure

```
feature-flag-system/
├── backend/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── organization.controller.js
│   │   │   └── flag.controller.js
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT verify + role check
│   │   ├── models/
│   │   │   ├── Organization.js
│   │   │   ├── User.js
│   │   │   └── FeatureFlag.js
│   │   └── routes/
│   │       ├── auth.routes.js
│   │       ├── organization.routes.js
│   │       └── flag.routes.js
│   ├── config/
│   │   └── db.js
│   ├── utils/
│   │   ├── constants.js            # regexes, business rules, defaults
│   │   └── helper.js               # signToken, validateEmail
│   ├── .env.example
│   └── server.js
│
└── frontend/
    └── projects/
        ├── super-admin/            # port 4200
        │   └── src/app/
        │       ├── components/     # Header, Footer, Toast
        │       ├── pages/          # Login, Dashboard
        │       └── services/       # ApiService, AuthService, ToastService, Guards
        │
        ├── admin/                  # port 4201
        │   └── src/app/
        │       ├── components/     # Header, Footer, Toast
        │       ├── pages/          # Login, Signup, Dashboard
        │       └── services/       # ApiService, AuthService, ToastService, Guards
        │
        └── user/                   # port 4202
            └── src/app/
                ├── components/     # Header, Footer
                ├── pages/          # Home (flag checker)
                └── services/       # ApiService
```

## How to Run

### Prerequisites

- Node.js
- MySQL running locally
- Angular CLI — `npm install -g @angular/cli`

### 1. Database

Create a MySQL database:

```sql
CREATE DATABASE IF NOT EXISTS feature_flags;
```

Tables are created automatically when the backend starts.

### 2. Backend

Copy `.env.example` to `.env` and fill in your values:

```
DB_USER=your_db_user
DB_PASS=your_db_password

JWT_SECRET=your_jwt_secret_here

SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=your_super_admin_password
```

```bash
cd backend
npm install
node server.js
```

### 3. Frontend

```bash
cd frontend
npm install
```

Run each app in a separate terminal:

```bash
ng serve super-admin --port 4200
ng serve admin --port 4201
ng serve user --port 4202
```
