FROM node:23-bookworm-slim AS builder

COPY . /app
WORKDIR /app

ENV TZ=Asia/Seoul

RUN apt-get update -y && apt-get install -y openssl

RUN corepack enable
RUN corepack prepare pnpm --activate
RUN pnpm install --frozen-lockfile

EXPOSE 8877

WORKDIR /app/packages/database
RUN pnpm run generate

WORKDIR /app/packages/api
RUN pnpm run build

CMD ["pnpm", "run", "start"]
