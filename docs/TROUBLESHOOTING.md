# Troubleshooting

| Problem | Fix |
|---|---|
| `backend` keeps restarting | `docker compose logs backend` - usually wrong DB credentials in `.env`. If you changed passwords after the first run, the MySQL volume still has the old ones: `docker compose down -v` (deletes data) and start again. |
| Port 80 already in use | Set `APP_PORT=8081` in `.env` and redeploy. |
| Page loads but shows "Cannot reach the server" | Backend not healthy yet (wait ~30-60 s) or crashed - check `docker compose ps`. |
| `Access denied for user` in local dev | Set `DB_USERNAME` / `DB_PASSWORD` environment variables for `mvn spring-boot:run`. |
| Flyway "checksum mismatch" | An applied migration was edited. Add a new migration instead; in dev you may drop the DB. |
| CORS error in browser (local dev) | Use `npm run dev` (proxy) or add your origin to `CORS_ALLOWED_ORIGINS`. |
| Dates one day off | Server runs in UTC; dates are plain `yyyy-MM-dd` values, no time zone conversion is applied. |
