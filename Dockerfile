FROM node:23-bookworm-slim AS builder

COPY . /app
WORKDIR /app

ENV time_zone=Asia/Seoul

RUN apt-get update -y && apt-get install -y openssl

RUN corepack enable
RUN corepack prepare pnpm --activate
RUN pnpm install --frozen-lockfile

EXPOSE 8877

WORKDIR /app/packages/database

RUN pnpm ts-node /app/scripts/generate-env.ts
RUN pnpm run generate
RUN pnpm run migrate:prod

WORKDIR /app/packages/api
RUN pnpm run build

CMD ["pnpm", "run", "start"]
