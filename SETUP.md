# Setup

## Option A - Docker (everything in one command)

Requirements: Docker with Compose v2.

```bash
./scripts/setup.sh       # first time only: creates .env
./scripts/deploy.sh      # build + start + wait until healthy
```

Without the helper scripts: `cp .env.example .env`, edit passwords, then `docker compose up -d --build`.

Useful commands:

```bash
docker compose logs -f backend     # follow API logs
docker compose ps                  # container status
docker compose down                # stop (data is kept in the mysql_data volume)
docker compose down -v             # stop AND delete the database
```

## Option B - Local development (VS Code)

Requirements: JDK 21, Maven 3.9+, Node 20+, MySQL 8.

1. Create the database: `mysql -u root -p < scripts/database-init.sql`
   (or let the dev profile create it with `createDatabaseIfNotExist=true`).
2. Backend (port 8080):
   ```bash
   cd backend
   export DB_USERNAME=root DB_PASSWORD=your_password    # defaults: root / root
   mvn spring-boot:run
   ```
   Flyway creates the tables automatically on first start.
3. Frontend (port 5173, proxies `/api` to 8080):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Open http://localhost:5173

## Configuration

| Variable | Where | Purpose |
|---|---|---|
| `MYSQL_*` | `.env` | DB name / user / passwords used by docker-compose |
| `APP_PORT` | `.env` | Public port of the website |
| `CORS_ALLOWED_ORIGINS` | `.env` / backend | Origins allowed to call the API directly |
| `SWAGGER_ENABLED` | `.env` / backend | Turn Swagger UI off in production |
| `VITE_CURRENCY`, `VITE_LOCALE` | `.env` / `frontend/.env` | Currency & number/date format (e.g. `USD` / `en-US`) |
| `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | backend | JDBC settings (prod profile) |
