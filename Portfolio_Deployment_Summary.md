# Portfolio Deployment

**shubham-portfolio.co.in**  
_March 2026 · Oracle Cloud Infrastructure · Zero Cost_

---

## Overview

The site runs on OCI's ARM Free Tier behind Cloudflare, with Nginx proxying to a Next.js app kept alive by PM2. The whole thing was stood up in a single session and costs nothing.

---

## Infrastructure Stack

| Layer | Technology / Detail |
|---|---|
| Cloud Provider | Oracle Cloud Infrastructure (OCI) — Free Tier |
| Server OS | Oracle Linux 9.7 (aarch64 — ARM) |
| App Framework | Next.js 16.1.6 (React) |
| Process Manager | PM2 with systemd auto-restart on reboot |
| Web Server / Reverse Proxy | Nginx 1.20.1 |
| CDN & Security | Cloudflare (Free Plan) |
| SSL/TLS | Cloudflare Origin Certificate — Full (Strict) mode |
| Domain | shubham-portfolio.co.in (registered via HostingRaja) |
| App Port | localhost:3000 (proxied via Nginx) |
| Total Cost | $0 — OCI Free Tier + Cloudflare Free Plan |

---

## How It Was Built

### 1. Server Setup

Provisioned an OCI ARM instance, SSHed in, and ran a setup script to install Node.js 20 and PM2, then built the Next.js app. PM2 was wired to systemd so the app comes back up automatically after a reboot.

### 2. Nginx Reverse Proxy

Installed Nginx to sit in front of the app. Hit a CSP syntax error in `next.config.ts` — fixed by rewriting the directives as a joined array. Proxy headers were configured for WebSocket compatibility: Upgrade, Connection, Host, and cache bypass.

### 3. Domain & DNS

Bought shubham-portfolio.co.in through HostingRaja, then migrated DNS to Cloudflare by swapping the nameservers. A records for both `@` and `www` point to the server IP, both proxied through Cloudflare.

### 4. Security Hardening

A few things were locked down:

- **Cloudflare SSL** set to Full (Strict) with an Origin Certificate installed on the server — traffic is encrypted end-to-end
- **SELinux** kept in enforcing mode; enabled `httpd_can_network_connect` so Nginx can proxy upstream without breaking it
- **Bot Fight Mode** on, plus custom WAF rules blocking sqlmap, nikto, masscan, and zgrab
- **OCI Security List** and firewalld both trimmed to only the ports that actually need to be open

---

## Current State

| Component | Status |
|---|---|
| Site live at https://shubham-portfolio.co.in | ✅ Live |
| HTTPS with Cloudflare Origin Certificate (Full Strict) | ✅ Active |
| PM2 auto-restart on server reboot | ✅ Enabled |
| Cloudflare CDN caching & performance | ✅ Active |
| Cloudflare WAF protection | ✅ Active |
| Bot Fight Mode | ✅ Enabled |
| SELinux enforcing mode | ✅ Enforcing |
| OCI Security List — ports locked to necessity | ✅ Configured |

---

## What's Next

Nothing critical — the setup is solid. A couple of nice-to-haves:

- **Fail2Ban:** automated brute-force IP banning
- **Mobile app:** a portfolio app is on the roadmap for later

---

_Total Time: ~1 Session · Total Cost: $0 · OCI Free Tier + Cloudflare Free Plan_
