#!/bin/sh
# Apply migrations on container startup (only once, here)
npx prisma migrate deploy
# Start app
node dist/main.js