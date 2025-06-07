#!/bin/sh

# Wait for PostgreSQL
echo "Waiting for PostgreSQL..."
while ! nc -z postgres 5432; do 
  sleep 1
done

# Run migrations
echo "Running migrations..."
npx prisma migrate deploy

# Start application
echo "Starting application..."
exec node server.js