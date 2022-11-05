# TRADING-API

- ### [For Development](#development)
- ### [Use Docker](#docker)

## Development

### Create `.env` for API

```env
NODE_ENV=
PORT=
DATABASE_URL=
PRISMA_GENERATE_OUTPUT=../src/generated/client
API_KEY_PUBLIC=
```

---

> _This is project use Prisma_

## Prisma

[https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres/](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres/)

### Generate Prisma Client for yarn berry

```sh
yarn generate
```

### How to migrate DB

```sh
yarn migrate
```

### Run Project

```sh
yarn dev
```

### Build Project

```sh
yarn build:local
```

### Run Unit Test

```sh
yarn test
```

---

> _For Integration Test_

### Use docker-compoes.test.yml

```sh
yarn database-test:up
```

### Run Integration Test

```sh
yarn test:integration
```

---

## Docker

### Create `.env.local` for API

```env
NODE_ENV=
PORT=
DATABASE_URL=postgresql://<user>:<password>@postgres:<port>/<db>?schema=public&connect_timeout=300
PRISMA_GENERATE_OUTPUT=../src/generated/client
API_KEY_PUBLIC=
```

### Run Docker Image Postgres

```sh
docker compose up db -d
```

### Run Project with Compose

```sh
docker compose up -d
```
