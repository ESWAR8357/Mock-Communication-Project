@echo off
echo ========================================
echo Mock Communication Platform Setup
echo ========================================
echo.

echo [1/4] Setting up Backend...
cd backend
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo Please edit backend\.env with your MongoDB URI and JWT secret
    pause
)

echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Backend installation failed!
    pause
    exit /b 1
)
echo Backend setup complete!
echo.

cd ..

echo [2/4] Setting up Frontend...
cd frontend
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend setup complete!
echo.

cd ..

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend\.env with your MongoDB URI
echo 2. Run 'npm start' in backend folder
echo 3. Run 'npm start' in frontend folder
echo.
echo For detailed instructions, see SETUP_GUIDE.md
echo.
pause
