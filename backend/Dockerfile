# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the project
COPY . /backend/

# Set the working directory to the backend folder
WORKDIR /backend/

# Collect static files, but ignore errors if there are no static files
RUN python manage.py collectstatic --noinput || echo "No static files to collect"

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["gunicorn", "--chdir", "/app/backend", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]