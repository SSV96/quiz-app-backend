#!/bin/sh
set -e

# Ensure LF line endings (safe if cloned on Windows)
# Only necessary if your editor/git converted line endings
# Run dos2unix start.sh if needed before building the image

echo "Starting Quiz App Backend..."
echo "NODE_ENV=$NODE_ENV"

# Run Prisma migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Start the NestJS app
echo "Starting NestJS server..."
exec node dist/main.js