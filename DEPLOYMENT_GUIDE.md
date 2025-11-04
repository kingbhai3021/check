# WittyWealth VPS Deployment Guide

## Prerequisites
- Hostinger VPS with Ubuntu 20.04/22.04
- Domain name pointed to your VPS IP
- SSH access to your VPS

## Step 1: Initial VPS Setup

### 1.1 Connect to your VPS
```bash
ssh root@your-vps-ip
```

### 1.2 Update system packages
```bash
apt update && apt upgrade -y
```

### 1.3 Install essential packages
```bash
apt install -y curl wget git nginx certbot python3-certbot-nginx ufw
```

## Step 2: Install Node.js and MongoDB

### 2.1 Install Node.js 18.x
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

### 2.2 Install MongoDB
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt-get update
apt-get install -y mongodb-org
systemctl start mongod
systemctl enable mongod
```

### 2.3 Install PM2 for process management
```bash
npm install -g pm2
```

## Step 3: Deploy Your Application

### 3.1 Create application directory
```bash
mkdir -p /var/www/wittywealth
cd /var/www/wittywealth
```

### 3.2 Clone your repository (or upload files)
```bash
# If using Git
git clone https://github.com/yourusername/wittywealth-unified.git .

# Or upload your files using SCP/SFTP
```

### 3.3 Install dependencies and build
```bash
# Install frontend dependencies
npm install

# Build frontend for production
npm run build

# Install backend dependencies
cd backend
npm install --production
cd ..
```

### 3.4 Configure environment variables
```bash
cd backend
cp production.env .env
nano .env
```

Update the following variables in `.env`:
```env
NODE_ENV=production
PORT=5000
MONGO_URL=mongodb://localhost:27017/wittywealth_prod
JWT_SECRET=your_super_secure_jwt_secret_here
FRONTEND_URL=https://yourdomain.com
# Add your other API keys and secrets
```

## Step 4: Configure Nginx

### 4.1 Create Nginx configuration
```bash
nano /etc/nginx/sites-available/wittywealth
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL configuration (will be added by Certbot)
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # Serve static files
    location / {
        root /var/www/wittywealth/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # API routes
    location /api {
        proxy_pass http://localhost:5050;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4.2 Enable the site
```bash
ln -s /etc/nginx/sites-available/wittywealth /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## Step 5: Setup SSL Certificate

### 5.1 Get SSL certificate from Let's Encrypt
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Step 6: Configure Firewall

### 6.1 Setup UFW firewall
```bash
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
```

## Step 7: Start Application with PM2

### 7.1 Create PM2 ecosystem file
```bash
nano /var/www/wittywealth/ecosystem.config.js
```

Add the following configuration:
```javascript
module.exports = {
  apps: [{
    name: 'wittywealth-backend',
    script: './backend/start-production.js',
    cwd: '/var/www/wittywealth',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/pm2/wittywealth-error.log',
    out_file: '/var/log/pm2/wittywealth-out.log',
    log_file: '/var/log/pm2/wittywealth-combined.log',
    time: true
  }]
};
```

### 7.2 Start the application
```bash
cd /var/www/wittywealth
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 8: Setup Database

### 8.1 Create production database
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

### 8.2 Update MongoDB connection string
Update your `.env` file with the new database credentials:
```env
MONGO_URL=mongodb://wittywealth_user:your_secure_password@localhost:27017/wittywealth_prod
```

## Step 9: Monitoring and Maintenance

### 9.1 Setup log rotation
```bash
nano /etc/logrotate.d/wittywealth
```

Add:
```
/var/log/pm2/wittywealth-*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 9.2 Setup automatic updates
```bash
crontab -e
```

Add:
```
# Update system packages weekly
0 2 * * 0 apt update && apt upgrade -y

# Restart application daily at 3 AM
0 3 * * * pm2 restart wittywealth-backend
```

## Step 10: Backup Strategy

### 10.1 Create backup script
```bash
nano /var/www/wittywealth/backup.sh
```

Add:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/wittywealth"
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --db wittywealth_prod --out $BACKUP_DIR/mongodb_$DATE

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/wittywealth

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete
```

### 10.2 Make backup script executable and schedule it
```bash
chmod +x /var/www/wittywealth/backup.sh
crontab -e
```

Add:
```
# Daily backup at 1 AM
0 1 * * * /var/www/wittywealth/backup.sh
```

## Troubleshooting

### Check application status
```bash
pm2 status
pm2 logs wittywealth-backend
```

### Check Nginx status
```bash
systemctl status nginx
nginx -t
```

### Check MongoDB status
```bash
systemctl status mongod
```

### View logs
```bash
# Application logs
pm2 logs wittywealth-backend

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# System logs
journalctl -u nginx
journalctl -u mongod
```

## Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSL certificate installed
- [ ] Database secured with authentication
- [ ] Environment variables properly configured
- [ ] Regular backups scheduled
- [ ] System updates automated
- [ ] Strong passwords used
- [ ] SSH key authentication enabled
- [ ] Unnecessary services disabled

## Performance Optimization

- [ ] Nginx gzip compression enabled
- [ ] PM2 cluster mode (if needed)
- [ ] MongoDB indexes optimized
- [ ] Static assets cached
- [ ] CDN configured (optional)

Your WittyWealth application should now be live at https://yourdomain.com!
