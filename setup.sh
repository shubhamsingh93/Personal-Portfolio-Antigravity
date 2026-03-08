#!/bin/bash

# =============================================================================
# setup.sh — Automated deployment setup for Shubham's Portfolio
# Supports: Ubuntu 20.04+, Debian 11+
# Usage: chmod +x setup.sh && ./setup.sh
# =============================================================================

set -e  # Exit immediately on any error

# ── Colours for output ────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Colour

log()    { echo -e "${GREEN}✅ $1${NC}"; }
warn()   { echo -e "${YELLOW}⚠️  $1${NC}"; }
info()   { echo -e "${BLUE}ℹ️  $1${NC}"; }
error()  { echo -e "${RED}❌ $1${NC}"; exit 1; }

# ── Banner ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}   🚀 Shubham's Portfolio — Automated Setup     ${NC}"
echo -e "${BLUE}=================================================${NC}"
echo ""

# ── Check minimum RAM (build requires ~512 MB free) ───────────────────────────
AVAILABLE_RAM_MB=$(awk '/MemAvailable/ { printf "%d", $2/1024 }' /proc/meminfo 2>/dev/null || echo "0")
if [ "$AVAILABLE_RAM_MB" -lt 400 ] 2>/dev/null; then
  warn "Low available RAM detected (~${AVAILABLE_RAM_MB} MB). The Next.js build may fail."
  warn "If it does, re-run with: NODE_OPTIONS='--max-old-space-size=512' npm run build"
fi

# ── Detect OS ─────────────────────────────────────────────────────────────────
OS="$(uname)"

case $OS in

  # ── Linux ──────────────────────────────────────────────────────────────────
  'Linux')
    log "Detected Linux environment."

    # Verify this is a Debian/Ubuntu-based system
    if ! command -v apt &> /dev/null; then
      error "This script requires a Debian/Ubuntu-based system (apt not found). For RHEL/CentOS, install Node.js 20.x manually via NodeSource and re-run."
    fi

    info "Updating package lists..."
    sudo apt update -y

    info "Installing build tools (build-essential, git, curl)..."
    sudo apt install -y build-essential git curl

    # ── Node.js ──────────────────────────────────────────────────────────────
    if ! command -v node &> /dev/null; then
      info "Node.js not found. Installing Node.js 20.x via NodeSource..."
      curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
      sudo apt-get install -y nodejs
      log "Node.js installed: $(node -v)"
    else
      NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
      if [ "$NODE_VERSION" -lt 18 ]; then
        warn "Node.js $(node -v) is below the required v18.17.0."
        warn "Upgrading to Node.js 20.x..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
        log "Node.js upgraded: $(node -v)"
      else
        log "Node.js already installed and meets requirements: $(node -v)"
      fi
    fi

    # ── PM2 ──────────────────────────────────────────────────────────────────
    if ! command -v pm2 &> /dev/null; then
      info "PM2 not found. Installing PM2 globally..."
      sudo npm install -g pm2
      log "PM2 installed: $(pm2 --version)"
    else
      log "PM2 already installed: $(pm2 --version)"
    fi
    ;;

  # ── macOS ──────────────────────────────────────────────────────────────────
  'Darwin')
    log "Detected macOS environment."
    if ! command -v node &> /dev/null; then
      error "Node.js is not installed. Install it via Homebrew (brew install node) or from https://nodejs.org, then re-run this script."
    fi
    NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
      error "Node.js $(node -v) is below the required v18.17.0. Please upgrade and re-run."
    fi
    log "Node.js found: $(node -v)"
    ;;

  # ── Unsupported ────────────────────────────────────────────────────────────
  *)
    warn "Unrecognised OS '${OS}'. Skipping system-level dependency installation."
    warn "Please ensure Node.js v18+ and npm v9+ are installed before continuing."
    ;;
esac

# ── Project Dependencies ──────────────────────────────────────────────────────
echo ""
info "Installing project npm dependencies..."
npm install
log "npm dependencies installed."

# ── Production Build ──────────────────────────────────────────────────────────
echo ""
info "Building the Next.js production bundle (this may take 2–5 minutes)..."
npm run build
log "Production build complete."

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}=================================================${NC}"
echo -e "${GREEN}   ✅ Setup Complete!                           ${NC}"
echo -e "${GREEN}=================================================${NC}"
echo ""
echo -e "${BLUE}▶ To start in development mode:${NC}"
echo "    npm run dev"
echo ""
echo -e "${BLUE}▶ To start in production mode (PM2 — Linux servers):${NC}"
echo "    pm2 start npm --name 'shubham-portfolio' -- run start"
echo "    pm2 startup && pm2 save   # auto-restart on reboot"
echo ""
echo -e "${BLUE}▶ To view live logs:${NC}"
echo "    pm2 logs shubham-portfolio"
echo ""
echo -e "${BLUE}▶ Next step — set up Nginx + HTTPS:${NC}"
echo "    sudo apt install nginx certbot python3-certbot-nginx -y"
echo "    sudo certbot --nginx -d yourdomain.com"
echo ""