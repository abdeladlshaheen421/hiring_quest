# hiring_quest

## Installation

```bash
$ nano .env #to make environment file and fill it as .env-example
```

```bash
$ npm install --legacy-peer-deps
```

## DataBase Connection

- create database and user and grant privileges to user on this database
  - `CREATE DATABASE db_name;`
  - `CREATE USER 'user'@'host' IDENTIFIED BY 'password';`
  - `GRANT ALL PRIVILEGES ON db_name.* TO 'user'@'localhost'`
- fill the env file with data
- `npm run migration:run` to run migration and create database tables
- `npm run seed` to run seeders

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Setup (Docker Compose)

2. Build and start:

- create `backend.env` file like .env-example
- run `docker compose  logs api -f`-> see api logs and check it works

```
docker compose up -d --build
```

3. App runs at http://localhost:3000

MySQL: localhost:3306 (db=hiring_quest)
Mongo: mongodb://localhost:27017/hiring_quest

- `docker compose exec -it api bash` to run terminal interactive of api service in container
- `npm run migration:run` to run migration and create database tables
- `npm run seed` to run seeders

## API Overview

- Auth
  - POST `/auth/login` → { access_token }

- Projects
  - POST `/projects/:id/matches/rebuild` (admin, client owner)

- Research Docs
  - POST `/research-docs/upload` (admin, client) → upload { title, content, tags?, projectId }
  - GET `/research-docs?tag=&text=&projectId=` (admin, client)

- Analytics
  - GET `/analytics/top-vendors` (admin)

## Matching Formula

`score = services_overlap * 2 + rating + SLA_weight`, where:

- `services_overlap` = count of intersecting services
- `SLA_weight` = 3 if SLA ≤ 24h, 1 if ≤ 72h, else 0

## Roles

- client: can operate on own projects, upload/search research docs
- admin: manage vendors, clients, analytics, rebuild matches
