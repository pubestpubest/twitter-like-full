#!/bin/sh
set -e

echo "Running DB migrations..."
pnpm run db:migrate

echo "Seeding database..."
pnpm run db:seed

echo "Starting application..."
exec "$@"
