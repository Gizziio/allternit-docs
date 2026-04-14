#!/bin/bash
# Platform Backend Installer - Hosted on install.gizziio.com
# Sets up the Allternit Platform backend on a VPS (Node.js + PM2)

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'
BEIGE='\033[38;2;212;176;140m'

echo -e "${BEIGE}"
echo "      ▄▄      "
echo "   ▄▄▄  ▄▄▄   "
echo " ▄██████████▄ "
echo " █  ●    ●  █ "
echo " █  A : / / █ "
echo "  ▀████████▀  "
echo "   █ █  █ █   "
echo "   ▀ ▀  ▀ ▀   "
echo -e "${NC}"
echo -e "${GREEN}Allternit Platform Backend Installer${NC}"
echo ""

# Check root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root: sudo bash platform-backend.sh${NC}"
    exit 1
fi

# Get configuration
read -p "Enter your API domain (e.g., api.platform.allternit.com): " DOMAIN
if [ -z "$DOMAIN" ]; then
    echo -e "${RED}Domain is required${NC}"
    exit 1
fi

read -p "Enter frontend URL (default: https://platform.allternit.com): " FRONTEND_URL
FRONTEND_URL=${FRONTEND_URL:-https://platform.allternit.com}

INSTALL_DIR="${INSTALL_DIR:-/opt/platform-backend}"

echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"

# Install Node.js 20
if ! command -v node &> /dev/null || [ "$(node -v | cut -d'v' -f2 | cut -d'.' -f1)" != "20" ]; then
    echo -e "${YELLOW}Installing Node.js 20...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs 2>/dev/null || yum install -y nodejs 2>/dev/null
fi

# Install PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    npm install -g pm2
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Installing Nginx...${NC}"
    apt-get install -y nginx 2>/dev/null || yum install -y nginx 2>/dev/null
fi

# Install PostgreSQL
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}Installing PostgreSQL...${NC}"
    apt-get install -y postgresql postgresql-contrib 2>/dev/null || yum install -y postgresql-server 2>/dev/null
    systemctl enable postgresql
    systemctl start postgresql
fi

# Install Certbot
if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}Installing Certbot...${NC}"
    apt-get install -y certbot python3-certbot-nginx 2>/dev/null || yum install -y certbot 2>/dev/null
fi

# Create directories
mkdir -p $INSTALL_DIR
cd $INSTALL_DIR

echo -e "${YELLOW}Setting up database...${NC}"

# Create database and user
DB_PASSWORD=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 24)
sudo -u postgres psql -c "CREATE DATABASE allternit;" 2>/dev/null || echo "Database exists"
sudo -u postgres psql -c "CREATE USER allternit WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || sudo -u postgres psql -c "ALTER USER allternit WITH PASSWORD '$DB_PASSWORD';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE allternit TO allternit;"

echo -e "${YELLOW}Downloading backend...${NC}"

# Download from GitHub releases
GITHUB_REPO="Gizziio/allternit-platform"
LATEST_RELEASE=$(curl -s "https://api.github.com/repos/$GITHUB_REPO/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$LATEST_RELEASE" ] || [ "$LATEST_RELEASE" = "null" ]; then
    echo -e "${YELLOW}Cloning from main branch...${NC}"
    if ! command -v git &> /dev/null; then
        apt-get install -y git 2>/dev/null || yum install -y git 2>/dev/null
    fi
    git clone --depth 1 https://github.com/$GITHUB_REPO.git $INSTALL_DIR
else
    echo -e "${YELLOW}Downloading release $LATEST_RELEASE...${NC}"
    curl -L "https://github.com/$GITHUB_REPO/archive/refs/tags/$LATEST_RELEASE.tar.gz" -o backend.tar.gz
    tar -xzf backend.tar.gz --strip-components=1
    rm backend.tar.gz
fi

# Install dependencies
echo -e "${YELLOW}Installing npm dependencies...${NC}}
cd $INSTALL_DIR
npm install --production

# Create environment file
echo -e "${YELLOW}Creating environment configuration...${NC}"

cat > .env << EOENV
# Server
NODE_ENV=production
PORT=3001
HOST=127.0.0.1

# Domain Configuration
DOMAIN=$DOMAIN
FRONTEND_URL=$FRONTEND_URL

# Database
DATABASE_URL=postgresql://allternit:$DB_PASSWORD@localhost:5432/allternit

# Clerk Authentication (REQUIRED)
# Get from: https://dashboard.clerk.com
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

# AI Provider API Keys
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_API_KEY=

# Optional Services
ELEVENLABS_API_KEY=
DEEPGRAM_API_KEY=
EOENV

# Save DB password
echo "$DB_PASSWORD" > .db_password

echo -e "${YELLOW}Configuring Nginx...${NC}"

# Create Nginx config
cat > /etc/nginx/sites-available/platform-backend << EONGINX
server {
    listen 80;
    server_name $DOMAIN;
    
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN;

    # SSL will be configured by Certbot
    # ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # CORS headers
    add_header 'Access-Control-Allow-Origin' '$FRONTEND_URL' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Handle preflight
        if (\$request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '$FRONTEND_URL';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
            add_header 'Access-Control-Allow-Headers' '*';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
EONGINX

# Enable site
ln -sf /etc/nginx/sites-available/platform-backend /etc/nginx/sites-enabled/ 2>/dev/null || true
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
nginx -t && systemctl reload nginx

# SSL Certificate
echo ""
echo -e "${YELLOW}Setting up SSL certificate for $DOMAIN...${NC}"
echo -e "${BLUE}Make sure DNS points $DOMAIN to this server ($(curl -s ifconfig.me))${NC}"
echo ""
read -p "Press Enter when DNS is configured..."

certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN 2>/dev/null || {
    echo -e "${YELLOW}SSL setup skipped. Run manually later:${NC}"
    echo -e "  certbot --nginx -d $DOMAIN"
}

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOPM2
module.exports = {
  apps: [{
    name: 'platform-backend',
    script: './node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '$INSTALL_DIR',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
EOPM2

mkdir -p logs

# Setup PM2 startup
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ Backend Setup Complete!                                    ${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo -e "  1. ${BLUE}Edit environment variables:${NC}"
echo -e "     nano $INSTALL_DIR/.env"
echo -e "     ${YELLOW}Add your Clerk API keys!${NC}"
echo ""
echo -e "  2. ${BLUE}Build the application:${NC}"
echo -e "     cd $INSTALL_DIR"
echo -e "     npm run build"
echo ""
echo -e "  3. ${BLUE}Start the backend:${NC}"
echo -e "     pm2 start ecosystem.config.js"
echo -e "     pm2 save"
echo ""
echo -e "  4. ${BLUE}Update frontend _redirects with:${NC}"
echo -e "     /api/*  https://$DOMAIN/api/:splat  200"
echo ""
echo -e "  5. ${BLUE}Test the API:${NC}"
echo -e "     curl https://$DOMAIN/api/backend/health"
echo ""
echo -e "${YELLOW}Management Commands:${NC}"
echo -e "  pm2 restart platform-backend  # Restart"
echo -e "  pm2 logs platform-backend     # View logs"
echo -e "  pm2 stop platform-backend     # Stop"
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
