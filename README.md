# Project Name

A Node.js backend application containerized with Docker.

## Prerequisites

Make sure you have the following installed on your system:
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
   - Update the `.env` file with your configuration

3. Run the application:
```bash
docker compose up
```
The application will be available at `http://localhost:3000`

To run in detached mode (background):
```bash
docker compose up -d
```

To stop the application:
```bash
docker compose down
```

## Project Structure
```.
├── backend/
│ ├── Dockerfile # Docker configuration for backend
│ ├── package.json # Node.js dependencies
│ └── scripts/
│ └── entrypoint.sh # Docker entrypoint script
├── .dockerignore # Files excluded from Docker build
├── docker-compose.yml # Docker Compose configuration
└── README.md # Project documentation
```

## Development

- The application uses `pnpm` as the package manager
- Hot-reload is enabled for development
- Node.js 20 Alpine is used as the base image for optimal size and performance

## Docker Configuration

- Backend service runs on port 3000
- Environment variables are managed through `.env` file (not included in Docker image for security)
- `node_modules` and `dist` directories are excluded from the Docker build

## Troubleshooting

If you encounter any issues:

1. Make sure Docker is running
2. Check if the required ports are available
3. Verify your environment variables
4. Try rebuilding the containers:
   ```bash
   docker compose down
   docker compose up --build
   ```

