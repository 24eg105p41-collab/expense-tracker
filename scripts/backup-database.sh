#!/usr/bin/env bash
# Dumps the MySQL database to database/backup/backup_<date>.sql
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; [ -f .env ] && . ./.env; set +a

mkdir -p database/backup
OUT="database/backup/backup_$(date +%F_%H%M%S).sql"
docker exec expense-mysql sh -c "mysqldump -u root -p\"\$MYSQL_ROOT_PASSWORD\" --single-transaction \"\$MYSQL_DATABASE\"" > "$OUT"
echo "Backup written to $OUT"
