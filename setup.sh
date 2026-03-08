#!/bin/bash

# =============================================================================
# setup.sh — Automated deployment setup for Shubham's Portfolio
# Supports: Ubuntu 20.04+, Debian 11+, Oracle Linux 8+, RHEL/CentOS 8+
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
  warn "Low available RAM detected (~${AVAILABLE_RAM_MB} MB)."
  warn "NODE_OPTIONS will be set to cap Node.js at 512 MB during the build step."
fi

# ── Detect OS ─────────────────────────────────────────────────────────────────
OS="$(uname)"

case $OS in

  # ── Linux ──────────────────────────────────────────────────────────────────
  'Linux')
    log "Detected Linux environment."

    # Detect package manager
    if command -v apt &> /dev/null; then
      PKG_MANAGER="apt"
      INSTALL_CMD="sudo apt install -y"
      UPDATE_CMD="sudo apt update -y"
      NODESOURCE_URL="https://deb.nodesource.com/setup_20.x"
      BUILD_TOOLS="build-essential git curl"
      FIREWALL="ufw"
    elif command -v dnf &> /dev/null; then
      PKG_MANAGER="dnf"
      INSTALL_CMD="sudo dnf install -y"
      UPDATE_CMD="sudo dnf update -y"           # FIX: was "check-update" which exits 100 and crashes set -e
      NODESOURCE_URL="https://rpm.nodesource.com/setup_20.x"
      BUILD_TOOLS="gcc-c++ make git curl"
      FIREWALL="firewalld"
    elif command -v yum &> /dev/null; then
      PKG_MANAGER="yum"
      INSTALL_CMD="sudo yum install -y"
      UPDATE_CMD="sudo yum update -y"           # FIX: same as above for yum
      NODESOURCE_URL="https://rpm.nodesource.com/setup_20.x"
      BUILD_TOOLS="gcc-c++ make git curl"
      FIREWALL="firewalld"
    else
      error "No supported package manager found (apt / dnf / yum). Please install Node.js v20 manually and re-run."
    fi

    info "Updating package lists using $PKG_MANAGER..."
    eval "$UPDATE_CMD"

    info "Installing build tools ($BUILD_TOOLS)..."
    eval "$INSTALL_CMD $BUILD_TOOLS"

    # ── Node.js ──────────────────────────────────────────────────────────────
    if ! command -v node &> /dev/null; then
      info "Node.js not found. Installing Node.js 20.x via NodeSource ($PKG_MANAGER)..."
      curl -fsSL $NODESOURCE_URL | sudo -E bash -
      eval "$INSTALL_CMD nodejs"
      log "Node.js installed: $(node -v)"
    else
      NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
      if [ "$NODE_VERSION" -lt 18 ]; then
        warn "Node.js $(node -v) is below the required v18.17.0. Upgrading to 20.x..."
        curl -fsSL $NODESOURCE_URL | sudo -E bash -
        eval "$INSTALL_CMD nodejs"
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

    # ── Firewall ports ────────────────────────────────────────────────────────
    # FIX: Oracle Linux / RHEL use firewalld, not UFW — ports must be opened
    # or Nginx will be unreachable even after installation
    if [ "$FIREWALL" = "firewalld" ]; then
      if command -v firewall-cmd &> /dev/null; then
        info "Opening ports 80 (HTTP) and 443 (HTTPS) in firewalld..."
        sudo firewall-cmd --permanent --add-service=http
        sudo firewall-cmd --permanent --add-service=https
        sudo firewall-cmd --reload
        log "firewalld: HTTP and HTTPS ports open."
      else
        warn "firewalld not running. Skipping firewall configuration."
        warn "Manually run: sudo firewall-cmd --permanent --add-service=http && sudo firewall-cmd --permanent --add-service=https && sudo firewall-cmd --reload"
      fi
    elif [ "$FIREWALL" = "ufw" ]; then
      if command -v ufw &> /dev/null; then
        info "Opening ports 80 and 443 in UFW..."
        sudo ufw allow OpenSSH
        sudo ufw allow 80/tcp
        sudo ufw allow 443/tcp
        sudo ufw --force enable
        log "UFW: HTTP and HTTPS ports open."
      else
        warn "UFW not found. Skipping firewall configuration."
      fi
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
# FIX: NODE_OPTIONS caps Node.js heap to 512 MB — required on OCI free-tier
# (1 GB RAM) to prevent the build from silently crashing with out-of-memory
echo ""
info "Building the Next.js production bundle (this may take 2–5 minutes)..."
NODE_OPTIONS="--max-old-space-size=512" npm run build
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
echo -e "${BLUE}▶ Next step — Nginx + HTTPS:${NC}"
echo "    # For Ubuntu/Debian:"
echo "    sudo apt install nginx certbot python3-certbot-nginx -y"
echo "    # For Oracle Linux / RHEL / CentOS:"
echo "    sudo dnf install nginx certbot python3-certbot-nginx -y"
echo "    # Then:"
echo "    sudo certbot --nginx -d yourdomain.com"
echo ""