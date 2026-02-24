# Users Manager API

Backend project developed with **Node.js**, **Express**, **Prisma**, and **SQLite**.

This API provides a complete and secure user management system, designed to demonstrate backend fundamentals and best practices.

## What this project demonstrates

- Clean REST API architecture
- Input validation and business logic
- Proper HTTP error handling
- Email normalization and uniqueness control
- Protection of sensitive data (password never exposed)
- Bulk data processing
- Clear separation of concerns (routes / controllers / services)

## Main Features

- User CRUD operations
- Search user by email
- Update user or password separately
- Bulk user creation with full validation
- Users count endpoint
- Conflict management (duplicate email)
- Structured JSON error responses

## Why this project matters

This project reflects real-world backend challenges:

- Data consistency
- Validation at API level
- Security awareness
- Maintainable project structure

It represents my ability to build reliable backend services ready to evolve (authentication, testing, scaling).

## Gettings Started

### Step 1: Initial Setup

- Clone the repo: `git clone https://github.com/bmakedika/users_manager`
- Navigate to the project directory: `cd users-managER`
- Install dependencies: `npm install`

### Step 2: Environment Variables

- Create `.env`.
- Add variable `PORT=8080`.
- Add also `DATABASE_URL=file:./dev.db`.

### Database setup

- Run `npx prisma generate`
- Run `npx prisma db push`

### Running the app

- Run `npm run dev`

## Managing packages with `npm`

- `npm install <package-name>`
- `npm install -D <package-name>`
- `npm uninstall <package-name>`
- `npm update <package-name>`

## Prisma commands

- `npx prisma studio`: Opens Prisma Studio to browser database
