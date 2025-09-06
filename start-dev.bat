@echo off
echo Starting Zenith Dashboard Development Environment...
echo.

echo Installing dependencies...
call npm install
call npm run install:all

echo.
echo Starting development servers...
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.

call npm run dev

pause
