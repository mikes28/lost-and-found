#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

echo "Rebuilding and starting Lost & Found with Docker Compose..."
docker compose down --remove-orphans
docker compose build --pull --no-cache backend frontend
docker compose up -d

echo
echo "Frontend: http://localhost:8080"
echo "Backend:  http://localhost:3000"
echo
echo "Useful commands:"
echo "  docker compose logs -f frontend"
echo "  docker compose logs -f backend"
echo "  docker compose down"
