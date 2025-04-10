FROM node:slim

COPY . /app
WORKDIR /app

ENV NODE_ENV=production
ENV TZ=Asia/Seoul

RUN apt-get update -y
RUN apt-get install -y openssl ca-certificates

RUN corepack enable
RUN corepack prepare pnpm --activate
RUN pnpm install --frozen-lockfile

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
