# Twitter-like Demo Application

A full-stack social media application built with Node.js, React, TypeScript, and PostgreSQL, containerized with Docker.

## Features

- User authentication (register/login)
- Profile management
- Post creation and interaction
- Follow/unfollow functionality
- Media upload support
- Real-time updates
- Responsive design

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with Drizzle ORM
- JWT Authentication
- MinIO for media storage

### Frontend
- React
- TypeScript
- Vite
- React Router

### Infrastructure
- Docker
- Docker Compose
- Node.js Alpine images
- PostgreSQL
- MinIO

## Prerequisites

Make sure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Environment Setup:
   - Copy the example environment file:
   ```bash
    cp .env.example .env
    ```
   - Update the `.env` file with your configuration:
     - Database credentials
     - JWT secret
     - MinIO credentials
     - Other environment-specific variables

3. Start the application:
   ```bash
   docker-compose up -d
   ```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- MinIO Console: `http://localhost:9090`

To run in detached mode:
```bash
docker-compose up -d
```

To stop the application:
```bash
docker-compose down
```

## Project Structure
```.
.
├── frontend/ # React frontend application
│ ├── src/ # Source files
│ ├── Dockerfile # Frontend Docker configuration
│ └── package.json # Frontend dependencies
├── backend/ # Node.js backend application
│ ├── src/ # Source files
│ │ ├── api/ # API routes and controllers
│ │ └── db/ # Database configuration and models
│ ├── Dockerfile # Backend Docker configuration
│ └── package.json # Backend dependencies
├── docker-compose.yml # Docker Compose configuration
├── .dockerignore # Docker ignore file
└── README.md # Project documentation
```


## Development

- The application uses `pnpm` as the package manager
- Hot-reload is enabled for both frontend and backend
- Database migrations run automatically on startup
- Seed data is provided for testing

## Environment Variables

Key environment variables needed:
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name
- `JWT_SECRET`: Secret for JWT tokens
- `MINIO_ACCESS_KEY`: MinIO access key
- `MINIO_SECRET_KEY`: MinIO secret key

## Troubleshooting

If you encounter any issues:

1. Make sure Docker is running
2. Check if the required ports (3000, 5173, 5432, 9000, 9090) are available
3. Verify your environment variables
4. Try rebuilding the containers:
```bash
docker compose down
docker compose up --build
```

## Security Notes

- Environment variables are not included in Docker images
- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is configured for security