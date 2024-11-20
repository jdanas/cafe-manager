# Cafe Manager

This project is a full-stack application for managing cafes, built with Django for the backend and Vite-based React for the frontend. The application is containerized using Docker and Docker Compose.

## Project Structure



## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

### Step 1: Clone the Repository

```sh
git clone https://github.com/yourusername/cafe-manager.git
cd cafe-manager

```

Step 2: Build and Run the Docker Containers
docker-compose up --build

Step 3: Create a Superuser
```docker ps
```
Access the Django container:
docker exec -it <django_container_id_or_name> /bin/bash

Run the createsuperuser command:
cd /app/backend
python manage.py createsuperuser

Step 4: Access the Application
Backend (Django Admin Interface): Open your web browser and go to http://localhost:8000/admin/. Log in with the superuser credentials you created.
Frontend (Vite-based React App): Open your web browser and go to http://localhost:3000/.


Environment Variables
Ensure the following environment variables are set in your docker-compose.yml file:

services:
  db:
    environment:
      POSTGRES_DB: dbcafe
      POSTGRES_USER: dbcafeuser
      POSTGRES_PASSWORD: dbcafepassword

  backend:
    environment:
      - DATABASE_URL=postgres://dbcafeuser:dbcafepassword@db:5432/dbcafe


Troubleshooting
docker-compose logs
