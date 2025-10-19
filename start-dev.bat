@echo off
echo Starting WittyWealth Unified Development Environment...
echo.

echo Starting Backend Server on port 8000...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server on port 5173...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Development servers are starting...
echo Backend: https://wittywealth.org
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul
