FROM node:22-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV YARN_CACHE_FOLDER=/tmp/.yarn-cache
RUN mkdir -p /tmp/.yarn-cache && chmod 777 /tmp/.yarn-cache

COPY package.json yarn.lock* .npmrc* ./
RUN yarn config set network-timeout 600000
RUN yarn config set registry https://registry.npmmirror.com/
RUN yarn --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/yarn.lock* ./
COPY --from=deps /app/.npmrc* ./
COPY prisma ./prisma
COPY src ./src
COPY public ./public
COPY next.config.ts ./
COPY jsconfig.json ./
COPY postcss.config.mjs ./
COPY tsconfig.json ./
COPY components.json ./
COPY .env* ./
COPY *.config.js ./
COPY *.config.ts ./
COPY *.config.mjs ./

RUN npx prisma generate
RUN yarn build

# Production (standalone)
FROM base 
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN apk add --no-cache libc6-compat

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

COPY --chown=nextjs:nodejs start.sh ./
RUN chmod +x start.sh

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["./start.sh"]