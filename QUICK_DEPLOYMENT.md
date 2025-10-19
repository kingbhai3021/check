# Quick Deployment Instructions for Hostinger VPS

## 🚀 Quick Start (5 Steps)

### Step 1: Prepare Your Local Files
```bash
# On your Windows machine, run:
prepare-deployment.bat
```

### Step 2: Upload Files to VPS
Upload these files/folders to `/var/www/wittywealth/` on your VPS:
- `dist/` (frontend build)
- `backend/` (backend application)
- `ecosystem.config.js`
- `deploy.sh`
- `DEPLOYMENT_GUIDE.md`

### Step 3: SSH into Your VPS
```bash
ssh root@your-vps-ip
```

### Step 4: Run Deployment Script
```bash
cd /var/www/wittywealth
chmod +x deploy.sh
sudo ./deploy.sh
```

### Step 5: Configure Domain & SSL
```bash
# Edit Nginx config with your domain
nano /etc/nginx/sites-available/wittywealth
# Replace 'yourdomain.com' with your actual domain

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🔧 Manual Configuration

### Environment Variables
```bash
nano /var/www/wittywealth/backend/.env
```

Required variables:
```env
NODE_ENV=production
PORT=5000
MONGO_URL=mongodb://localhost:27017/wittywealth_prod
JWT_SECRET=your_super_secure_jwt_secret_here
FRONTEND_URL=https://yourdomain.com
```

### MongoDB Setup
```bash
mongo
use wittywealth_prod
db.createUser({
  user: "wittywealth_user",
  pwd: "your_secure_password",
  roles: [{ role: "readWrite", db: "wittywealth_prod" }]
})
exit
```

## 📊 Monitoring Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs wittywealth-backend

# Restart application
pm2 restart wittywealth-backend

# Check Nginx status
systemctl status nginx

# Check MongoDB status
systemctl status mongod
```

## 🚨 Troubleshooting

### Application not starting?
```bash
pm2 logs wittywealth-backend
# Check for missing environment variables or database connection issues
```

### Nginx errors?
```bash
nginx -t
tail -f /var/log/nginx/error.log
```

### Database connection issues?
```bash
systemctl status mongod
mongo --eval "db.adminCommand('ismaster')"
```

## 🔒 Security Checklist

- [ ] Firewall enabled (UFW)
- [ ] SSL certificate installed
- [ ] Strong passwords set
- [ ] Environment variables configured
- [ ] Database secured
- [ ] Regular backups scheduled

## 📈 Performance Tips

- Enable Nginx gzip compression
- Use PM2 cluster mode for multiple CPU cores
- Configure MongoDB indexes
- Set up CDN for static assets (optional)

Your application will be available at: `https://yourdomain.com`
