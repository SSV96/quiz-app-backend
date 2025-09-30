FROM node:22.18.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci


COPY . .


RUN npx prisma generate


RUN npm run build


FROM node:22.18.0-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma


COPY start.sh ./start.sh
RUN chmod +x start.sh

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3001

ENTRYPOINT ["./start.sh"]
