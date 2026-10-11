#!/usr/bin/env bash
# Builds and starts MySQL + Spring Boot + React (nginx) with Docker Compose.
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env ] || ./scripts/setup.sh

docker compose up -d --build

PORT=$(grep -E '^APP_PORT=' .env | cut -d= -f2 || true)
PORT=${PORT:-80}
echo "Waiting for the application to become healthy..."
for i in $(seq 1 60); do
  if curl -fsS "http://localhost:${PORT}/actuator/health" >/dev/null 2>&1; then
    echo "Expense Tracker is up:  http://localhost:${PORT}/"
    echo "API docs (Swagger):     http://localhost:${PORT}/swagger-ui.html"
    exit 0
  fi
  sleep 3
done
echo "Application did not become healthy in time. Check: docker compose logs backend"
exit 1
