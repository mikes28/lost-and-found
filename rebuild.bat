@echo off
setlocal
cd /d %~dp0

echo Rebuilding Lost ^& Found images...
docker compose down --remove-orphans
docker compose build --pull --no-cache backend frontend
docker compose up -d

echo.
echo Rebuild complete.
echo Frontend: http://localhost:8080
echo Backend:  http://localhost:3000
