# Backend - NestJS + Prisma
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Prisma generate (schema only; no DB connection needed)
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
RUN ./node_modules/.bin/prisma generate
RUN npm run build
# Ensure generated Prisma client is in dist for runtime (rootDir "." means output is dist/src/...)
RUN mkdir -p dist/src/infrastructure/prisma && cp -r src/infrastructure/prisma/generated dist/src/infrastructure/prisma/

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
EXPOSE 3352
CMD ["node", "dist/src/main.js"]
