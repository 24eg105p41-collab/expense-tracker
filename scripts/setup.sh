#!/usr/bin/env bash
# Prepares the project for its first run: checks Docker and creates .env
set -euo pipefail
cd "$(dirname "$0")/.."

command -v docker >/dev/null 2>&1 || { echo "Docker is not installed. See https://docs.docker.com/get-docker/"; exit 1; }
docker compose version >/dev/null 2>&1 || { echo "Docker Compose v2 is required (docker compose ...)."; exit 1; }

if [ ! -f .env ]; then
  cp .env.example .env
  # generate random passwords so the default ones are never used in production
  if command -v openssl >/dev/null 2>&1; then
    sed -i.bak "s/change_me_please/$(openssl rand -hex 12)/; s/change_me_root_please/$(openssl rand -hex 12)/" .env && rm -f .env.bak
  fi
  echo "Created .env (review it, then run ./scripts/deploy.sh)"
else
  echo ".env already exists - leaving it untouched"
fi
