# NestJS CRUD Application with MongoDB (Dockerized)

This is a simple **NestJS CRUD application** connected to **MongoDB**, fully containerized using **Docker** and **Docker Compose**. This README provides step-by-step instructions for running the project in **development** and **production** environments.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development Setup](#development-setup)
- [Production Setup](#production-setup)
- [Docker Compose Setup](#docker-compose-setup)
- [Making Code Changes](#making-code-changes)
- [Cleanup](#cleanup)
- [Troubleshooting](#troubleshooting)
- [References](#references)

---

## Prerequisites

Before running the project, make sure you have:

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- Optionally, [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed for local development

---

## Project Structure

.
├── src/ # Source code
├── test/ # Test files
├── dist/ # Compiled code (auto-generated)
├── Dockerfile # Production Dockerfile
├── Dockerfile.dev # Development Dockerfile with hot reload
├── docker-compose.yml
├── .dockerignore
├── package.json
├── pnpm-lock.yaml
└── README.md

yaml
Copy code

---

## Environment Variables

You can create a `.env` file in the root of your project or set environment variables in `docker-compose.yml`.

Example `.env`:

```env
MONGO_URI=mongodb://mongo:27017/nest_crud
PORT=3000
Development Setup (Hot Reload)
Make sure Dockerfile.dev exists and supports hot reload (with pnpm run start:dev).

Start the containers:

bash
Copy code
docker compose -f docker-compose.yml up --build
The NestJS app will start in development mode with hot reload.

Open your browser at: http://localhost:3000

Any changes in src/ will automatically reload the application inside the container.

Production Setup
Build the Docker image for production:

bash
Copy code
docker build -t nest-crud-api .
Start the container:

bash
Copy code
docker run -p 3000:3000 nest-crud-api
Make sure MongoDB is running and accessible at mongodb://mongo:27017/nest_crud.

Your NestJS app will now run in production mode using the compiled dist/main.js.

Docker Compose Setup (Recommended)
docker-compose.yml is configured to run both API and MongoDB containers.

To start both services:

bash
Copy code
docker compose up --build
Access the app at: http://localhost:3000

The api service depends on mongo, so MongoDB will start first.

The app will automatically connect to MongoDB using the service name mongo.

Making Code Changes
Development (hot reload):

Any changes in src/ are automatically reflected in the container.

No need to rebuild the Docker image for each change.

Production:

After code changes, you need to rebuild the image:

bash
Copy code
docker compose build
docker compose up
Node modules are installed inside the container; no need to install locally unless you want to run tests outside Docker.

Cleanup
Stop containers:

bash
Copy code
docker compose down
Remove all containers and volumes (optional):

bash
Copy code
docker compose down -v
Troubleshooting
MongoDB connection error:

Ensure the MONGO_URI points to mongo (the Docker service name) and not localhost.

Check that the MongoDB container is running:

bash
Copy code
docker ps
Hot reload not working:

Ensure the volumes in docker-compose.yml correctly map your local src/ directory to /app/src.

References
NestJS Documentation

Docker Documentation

MongoDB Docker Image

Quick Start Commands
Development:

bash
Copy code
docker compose up --build
Production:

bash
Copy code
docker build -t nest-crud-api .
docker run -p 3000:3000 nest-crud-api
yaml

