# Shubham Singh - Product Manager Portfolio

Welcome to the source code for my interactive Product Management portfolio. This application is built with modern web technologies, focusing on high performance, 3D interactive elements, and robust animations to showcase my experience in building B2B and Enterprise SaaS products.

## 🚀 Features

- **Interactive 3D Hero**: Uses WebGL and React Three Fiber for a dynamic, interactive wireframe background.
- **Cinematic Animations**: Powered by Framer Motion and GSAP for fluid transitions and scroll effects.
- **Dark Matter Theme**: Custom Tailwind CSS implementation for a striking, high-contrast aesthetic.
- **Fully Responsive**: Graceful degradation of heavy animations for mobile browsers, with a custom mobile bottom-sheet navigation.
- **Bento Grid Layouts**: Clean, modern display of skills, projects, and results.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D/WebGL**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React
- **Data**: Static JSON (`src/data/resume.json`)

---

## 💻 Local Development Requirements

To run this application on your local machine, you need the following prerequisites installed:

### Global Prerequisites (All Platforms)
- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For version control

### Running Locally (macOS & Windows)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubhamsingh93/Personal-Portfolio-Antigravity.git
   cd Personal-Portfolio-Antigravity
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐧 Linux Deployment Guide (Ubuntu/Debian)

If you are planning to deploy this Next.js application to a Linux server (like an AWS EC2 instance, DigitalOcean Droplet, or similar), follow these instructions for a production-ready setup.

### Automated Linux Setup (Recommended)

To run this application on a fresh Linux server, use the included automation script. It will detect your OS, install Node.js and PM2 globally (if missing), install all project dependencies, and build the production Next.js bundle automatically.

You will need SSH access to your server and standard `sudo` privileges.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubhamsingh93/Personal-Portfolio-Antigravity.git
   cd Personal-Portfolio-Antigravity
   ```

2. **Run the Setup Script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start the application with PM2:**
   Once the script finishes building, run this command to keep it alive in the background:
   ```bash
   pm2 start npm --name "shubham-portfolio" -- run start
   ```

4. **Ensure PM2 starts on server boot:**
   If your server restarts, you want the app to come back automatically:
   ```bash
   pm2 startup
   pm2 save
   ```

### Reverse Proxy (Optional but Recommended)
For a production environment, you should not expose port 3000 directly. Instead, install **Nginx** and set it up as a reverse proxy to forward traffic from HTTP (80) or HTTPS (443) to your Node application running on `localhost:3000`. 

*(Consult standard Nginx reverse proxy documentation for your specific Linux distribution to complete this step).*

---

## 📁 Project Structure

```text
src/
├── app/               # Next.js App Router pages and global layout
├── components/        
│   ├── canvas/        # WebGL & Three.js components
│   ├── sections/      # Major page sections (Hero, Experience, etc.)
│   └── ui/            # Reusable UI elements (Navigation, custom cursors)
├── data/              # JSON data files driving the portfolio content
└── lib/               # Utility functions (utils.ts)
```

## 📝 License
This project is for personal portfolio usage.
