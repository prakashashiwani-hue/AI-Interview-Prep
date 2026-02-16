# ----------------------------- 
# Base Image
# ----------------------------- 
FROM node:22.13.1-alpine3.21 AS base
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl bash curl
RUN npm i -g pnpm

# ----------------------------- 
# Dependencies Stage
# ----------------------------- 
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --frozen-lockfile

# ----------------------------- 
# Builder Stage
# ----------------------------- 
FROM base AS builder
WORKDIR /app

COPY --from=deps /app /app
COPY . .

# Generate Prisma client (binaryTargets should include "linux-musl" in schema.prisma)
RUN pnpm db:generate

# Build Next.js standalone output
RUN pnpm --filter web build

# Debug: confirm server.js exists (remove in prod)
RUN find /app/apps/web/.next/standalone -name "server.js" || true

# ----------------------------- 
# Production Runner
# ----------------------------- 
FROM node:22.13.1-alpine3.21 AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl bash curl

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy Next.js standalone output (includes its own node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./

# Copy static assets (CSS, JS chunks, etc.)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

# Copy public folder
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./public

# Copy Prisma schema + migrations
COPY --from=builder --chown=nextjs:nodejs /app/packages/db ./packages/db

# Install pinned Prisma CLI (match your actual version, e.g. 5.x)
# Do this as root before switching users
RUN npm install --prefix /app prisma @prisma/client \
  && cd /app/packages/db \
  && npx prisma generate

# Fix ownership of installed node_modules
RUN chown -R nextjs:nodejs /app/node_modules

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD bash -c "\
  echo 'Running Prisma migrations...'\
  cd /app/packages/db && npx prisma migrate deploy\
  echo 'Starting Next.js server...'\
  cd /app && node server.js\
"