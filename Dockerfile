# -------- BUILD STAGE --------
FROM node:22.18.0-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache bash git python3 make g++

# Copy package files and install all deps
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client and build NestJS
RUN npx prisma generate
RUN npm run build

# -------- PRODUCTION STAGE --------
FROM node:22.18.0-alpine AS runner

WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV HUSKY_SKIP_INSTALL=1

# Install only production dependencies without running scripts
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy built app and Prisma client from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy start script
COPY start.sh ./start.sh
RUN chmod +x start.sh

# Use non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose port and start app
EXPOSE 3002
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]