#!/bin/bash

# WittyWealth Deployment Script
# Run this script on your VPS after uploading your project files

set -e

echo "🚀 Starting WittyWealth deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    print_status "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt-get install -y nodejs
else
    print_status "Node.js already installed"
fi

# Install MongoDB if not installed
if ! command -v mongod &> /dev/null; then
    print_status "Installing MongoDB..."
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    apt-get update
    apt-get install -y mongodb-org
    systemctl start mongod
    systemctl enable mongod
else
    print_status "MongoDB already installed"
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2..."
    npm install -g pm2
else
    print_status "PM2 already installed"
fi

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    print_status "Installing Nginx..."
    apt install -y nginx
    systemctl start nginx
    systemctl enable nginx
else
    print_status "Nginx already installed"
fi

# Install Certbot if not installed
if ! command -v certbot &> /dev/null; then
    print_status "Installing Certbot..."
    apt install -y certbot python3-certbot-nginx
else
    print_status "Certbot already installed"
fi

# Install UFW if not installed
if ! command -v ufw &> /dev/null; then
    print_status "Installing UFW..."
    apt install -y ufw
else
    print_status "UFW already installed"
fi

# Create application directory
APP_DIR="/var/www/wittywealth"
print_status "Setting up application directory at $APP_DIR..."

if [ ! -d "$APP_DIR" ]; then
    mkdir -p $APP_DIR
fi

# Copy project files (assuming script is run from project root)
print_status "Copying project files..."
cp -r . $APP_DIR/
cd $APP_DIR

# Install dependencies
print_status "Installing frontend dependencies..."
npm install

print_status "Building frontend for production..."
npm run build

print_status "Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Setup environment variables
print_status "Setting up environment variables..."
if [ ! -f "backend/.env" ]; then
    if [ -f "backend/production.env" ]; then
        cp backend/production.env backend/.env
        print_warning "Please update backend/.env with your actual configuration values"
    else
        print_error "No environment file found. Please create backend/.env"
        exit 1
    fi
fi

# Create PM2 log directory
mkdir -p /var/log/pm2

# Setup Nginx configuration
print_status "Setting up Nginx configuration..."
cat > /etc/nginx/sites-available/wittywealth << 'EOF'
server {
    listen 80;
    server_name _;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

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
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/wittywealth /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx

# Setup firewall
print_status "Configuring firewall..."
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Start application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Create backup directory
mkdir -p /var/backups/wittywealth

print_status "Deployment completed successfully!"
print_warning "Next steps:"
echo "1. Update backend/.env with your actual configuration values"
echo "2. Configure your domain name in Nginx configuration"
echo "3. Run: certbot --nginx -d yourdomain.com -d www.yourdomain.com"
echo "4. Create MongoDB database and user"
echo "5. Test your application"

print_status "Application should be accessible at http://your-vps-ip"
print_status "Check application status with: pm2 status"
print_status "View logs with: pm2 logs wittywealth-backend"
