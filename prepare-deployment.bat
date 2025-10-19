@echo off
echo 🚀 Preparing WittyWealth for deployment...

echo.
echo 📦 Building frontend for production...
call npm run build

echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install --production
cd ..

echo.
echo ✅ Production build completed!
echo.
echo 📋 Next steps:
echo 1. Upload all files to your VPS at /var/www/wittywealth/
echo 2. SSH into your VPS
echo 3. Run: sudo ./deploy.sh
echo 4. Configure your domain and SSL certificate
echo.
echo 📁 Files ready for upload:
echo - dist/ (frontend build)
echo - backend/ (backend application)
echo - ecosystem.config.js (PM2 configuration)
echo - deploy.sh (deployment script)
echo - DEPLOYMENT_GUIDE.md (detailed instructions)
echo.
pause
