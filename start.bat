@echo off
echo 🧠 AI Customer Support Agent - Quick Start
echo ==========================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Check if .env files exist
if not exist "server\.env" (
    echo 📝 Creating server environment file...
    copy "server\env.example" "server\.env"
    echo ⚠️  Please edit server\.env and add your OpenRouter API key
)

if not exist "client\.env" (
    echo 📝 Creating client environment file...
    copy "client\env.example" "client\.env"
)

echo 🚀 Starting the application with Docker Compose...
echo This may take a few minutes on first run...

REM Start the application
docker-compose up --build

echo.
echo 🎉 Application started successfully!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo 🗄️  MongoDB: localhost:27017
echo.
echo To stop the application, run: docker-compose down
echo To view logs, run: docker-compose logs -f
pause
