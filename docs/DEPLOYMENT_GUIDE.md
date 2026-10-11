# Deployment guide

## 1. Any Linux server / VPS (Docker)

1. Install Docker + Compose plugin, copy this project to the server (`scp`, `git clone`, ...).
2. `./scripts/setup.sh` then edit `.env` (set `APP_PORT=80`, strong passwords, `VITE_CURRENCY`).
3. `./scripts/deploy.sh`
4. Open `http://<server-ip>/`.

Update to a new version: copy the new files, run `./scripts/deploy.sh` again (the DB volume is kept and Flyway
applies new migrations automatically).

## 2. HTTPS

Put a TLS terminator in front of the `frontend` container, e.g. Caddy or Traefik, or run certbot with nginx on the host
and proxy to `localhost:<APP_PORT>`. Set `APP_PORT=8080` (or similar) if the host nginx uses port 80.

## 3. Platforms that run Docker images (Render, Railway, Fly.io, ...)

Deploy three services from the same repo: a managed MySQL, the backend (`backend/Dockerfile`, build context `backend/`; env vars
`SPRING_PROFILES_ACTIVE=prod`, `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`) and the frontend (`frontend/Dockerfile`,
build context = repository root). In `nginx.conf` change `backend:8080` to the backend's internal host name.

## Backups & health

- `./scripts/backup-database.sh` writes a dump to `database/backup/`.
- Health endpoint: `/actuator/health` (used by Docker health checks).
- Logs: `docker compose logs -f backend`.
