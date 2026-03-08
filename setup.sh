#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Automated Setup for Shubham's Portfolio..."

# Determine OS
OS="$(uname)"
case $OS in
  'Linux')
    echo "🐧 Detected Linux Environment."
    
    echo "📦 Checking system updates..."
    sudo apt update -y
    
    echo "📦 Installing build essential & git..."
    sudo apt install -y build-essential git curl
    
    # Check if Node is installed
    if ! command -v node &> /dev/null; then
        echo "🟢 Node.js not found. Installing Node.js 20.x..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    else
        echo "🟢 Node.js is already installed. Version: $(node -v)"
    fi
    
    # Check if PM2 is installed
    if ! command -v pm2 &> /dev/null; then
        echo "🔄 PM2 not found. Installing PM2 globally..."
        sudo npm install -g pm2
    else
        echo "🔄 PM2 is already installed."
    fi
    ;;
  'Darwin')
    echo "🍏 Detected macOS Environment."
    if ! command -v node &> /dev/null; then
        echo "⚠️ Node.js is not installed. Please install it from https://nodejs.org or via Homebrew (brew install node)."
        exit 1
    fi
    ;;
  *) 
    echo "⚠️ Environment not explicitly supported by this script for system-level dependencies. Continuing to project dependencies..." 
    ;;
esac

echo "📂 Installing project Node dependencies..."
npm install

echo "🏗️ Building the Next.js production application..."
npm run build

echo "✅ Setup Complete!"
echo " "
echo "To run the app locally, type:"
echo "  npm run dev"
echo " "
echo "To run the app in production using PM2 (Linux servers), type:"
echo "  pm2 start npm --name 'shubham-portfolio' -- run start"
echo " "
