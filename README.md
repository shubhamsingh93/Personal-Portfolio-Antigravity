# Shubham Singh — Product Manager Portfolio

> An interactive, high-performance portfolio built to showcase product management experience across B2B and Enterprise SaaS. Features 3D WebGL animations, cinematic scroll effects, and a responsive dark-matter design system.

🔗 **Live Site**: [shubham-portfolio.co.in](https://shubham-portfolio.co.in)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Local Development](#-local-development)
- [Linux Deployment (Oracle Cloud / AWS / DigitalOcean)](#-linux-deployment-oracle-cloud--aws--digitalocean)
- [Environment Variables](#-environment-variables)
- [Performance Notes](#-performance-notes)
- [License](#-license)

---

## ✨ Features

- **Interactive 3D Hero** — WebGL wireframe background built with React Three Fiber & Three.js
- **Cinematic Animations** — Fluid scroll transitions powered by Framer Motion and GSAP
- **Dark Matter Theme** — High-contrast custom Tailwind CSS design system
- **Fully Responsive** — Mobile-optimised with graceful animation degradation and a bottom-sheet navigation
- **Bento Grid Layouts** — Clean, structured display of skills, projects, and impact metrics
- **Static Data Layer** — All portfolio content driven from a single `resume.json` file — no database required

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| 3D / WebGL | Three.js, React Three Fiber, React Three Drei |
| Animations | Framer Motion, GSAP |
| Icons | Lucide React |
| Data | Static JSON (`src/data/resume.json`) |
| Process Manager (prod) | PM2 |
| Reverse Proxy (prod) | Nginx |

---

## 📁 Project Structure

```text
Personal-Portfolio-Antigravity/
├── src/
│   ├── app/               # Next.js App Router — pages, layouts, global styles
│   ├── components/
│   │   ├── canvas/        # WebGL & Three.js 3D scene components
│   │   ├── sections/      # Full-page sections (Hero, Experience, Projects, etc.)
│   │   └── ui/            # Reusable UI elements (Navigation, cursors, buttons)
│   ├── data/
│   │   └── resume.json    # ⭐ All portfolio content lives here — edit this to update the site
│   └── lib/
│       └── utils.ts       # Shared utility functions
├── public/                # Static assets (images, fonts, favicons)
├── setup.sh               # Automated Linux server setup script
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind design tokens
├── tsconfig.json          # TypeScript configuration
└── package.json
```

> **To update portfolio content** (projects, experience, skills): edit `src/data/resume.json` and rebuild. No component code changes needed.

---

## 💻 Local Development

### Prerequisites

| Tool | Required Version | Check |
|---|---|---|
| Node.js | v18.17.0 or higher | `node -v` |
| npm | v9.0.0 or higher | `npm -v` |
| Git | Any recent version | `git --version` |

> **Tip**: Use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions. Run `nvm use 20` if you have it installed.

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/shubhamsingh93/Personal-Portfolio-Antigravity.git
cd Personal-Portfolio-Antigravity

# 2. Install dependencies (~1–2 min on first run)
npm install

# 3. Start the development server with hot-reload
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Changes to source files reload automatically.

### Other Useful Commands

```bash
npm run build      # Build the optimised production bundle
npm run start      # Start the production server locally (run build first)
npm run lint       # Run ESLint across the project
```

---

## 🐧 Linux Deployment (Oracle Cloud / AWS / DigitalOcean)

This guide covers deploying to a fresh Ubuntu 20.04 / 22.04 server. The included `setup.sh` script automates the Node.js and PM2 installation steps.

### Prerequisites

- A Linux VM with at least **1 vCPU / 1 GB RAM** (2 GB recommended for the build step)
- SSH access with `sudo` privileges
- A domain name pointed to your server's public IP (for HTTPS)
- Ports **22**, **80**, and **443** open in your firewall / cloud security list

### Step 1 — Clone and Run Setup Script

```bash
git clone https://github.com/shubhamsingh93/Personal-Portfolio-Antigravity.git
cd Personal-Portfolio-Antigravity
chmod +x setup.sh
./setup.sh
```

The script will:
- Run `apt update` and install `build-essential`, `git`, and `curl`
- Install **Node.js 20.x** via NodeSource (if not already present)
- Install **PM2** globally (if not already present)
- Run `npm install` to install all project dependencies
- Run `npm run build` to produce the optimised production bundle

> ⚠️ The build step is memory-intensive. If your server has less than 1 GB RAM, the build may fail with an out-of-memory error. See [Troubleshooting](#troubleshooting) below.

### Step 2 — Start the App with PM2

```bash
# Start the app as a background process named "shubham-portfolio"
pm2 start npm --name "shubham-portfolio" -- run start

# Confirm it's running
pm2 status

# View live logs
pm2 logs shubham-portfolio
```

### Step 3 — Auto-Start on Server Reboot

```bash
pm2 startup          # Follow the printed command (copies a systemd service)
pm2 save             # Saves the current process list
```

### Step 4 — Configure Nginx as Reverse Proxy

Nginx forwards public HTTP/HTTPS traffic to the Node.js app on port 3000.

```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/portfolio
```

Paste the following:

```nginx
server {
    listen 80;
    server_name shubham-portfolio.co.in www.shubham-portfolio.co.in;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t        # Test config — should print "syntax is ok"
sudo systemctl reload nginx
```

### Step 5 — Enable HTTPS with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d shubham-portfolio.co.in -d www.shubham-portfolio.co.in
```

Certbot will automatically configure SSL and set up auto-renewal. Your site will be live at `https://shubham-portfolio.co.in`.

---

## 🔐 Environment Variables

This project currently runs without any required environment variables (all data is static). If you add integrations (e.g. a contact form, analytics), create a `.env.local` file in the project root:

```bash
# .env.local — never commit this file to git
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX   # Google Analytics (client-side)
CONTACT_FORM_API_KEY=your_secret_key          # Server-side only — no NEXT_PUBLIC_ prefix
```

> **Important**: The `.env.local` file is already listed in `.gitignore`. Never use the `NEXT_PUBLIC_` prefix for secrets — those values are embedded into the client-side bundle and visible to anyone.

---

## ⚡ Performance Notes

- The 3D WebGL scene is automatically disabled on mobile devices and low-end hardware to preserve performance.
- The production build (`npm run build`) applies Next.js image optimisation, code splitting, and tree-shaking automatically.
- If the server has limited RAM, you can set a Node.js memory limit for the build step:

```bash
NODE_OPTIONS="--max-old-space-size=512" npm run build
```

---

## 🔧 Troubleshooting

**Build fails with JavaScript heap out of memory**
```bash
NODE_OPTIONS="--max-old-space-size=512" npm run build
```

**Port 3000 already in use**
```bash
lsof -i :3000          # Find the process using the port
kill -9 <PID>          # Kill it
pm2 restart shubham-portfolio
```

**PM2 app shows "errored" status**
```bash
pm2 logs shubham-portfolio --lines 50   # View recent error logs
pm2 restart shubham-portfolio
```

**Nginx 502 Bad Gateway**  
The Node.js app is not running. Check `pm2 status` and restart if needed.

---

## 📝 License

This project is for personal portfolio use. Not licensed for redistribution.