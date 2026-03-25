# 💸 Simple Expense Tracker

![License](https://img.shields.io/badge/license-MIT-emerald.svg)
![Node](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Express](https://img.shields.io/badge/Express.js-Backend-black.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue.svg)
![Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)

A beautifully crafted, modern full-stack web application designed for ordinary users to cleanly track their daily expenses and monitor aggregate spending. 

Built strictly with clean **Vanilla JavaScript/HTML/CSS** on the frontend, and secured by a high-performance **Node.js, Express, & PostgreSQL** environment on the backend. This minimal yet powerful template is strictly structured for enterprise-grade scalability and security.

---

## ✨ Features
- **Dynamic Financial Dashboard**: Featuring a live "Total Amount Spent" calculator that instantly synchronizes via Fetch API logic.
- **Emerald Glass-Style UI**: Modern, responsive, and seamless CSS aesthetic using gradients and gentle animations.
- **Robust Form Validation**: Natively blocks invalid numeric inputs, empty titles, and bounded string limits.
- **Enterprise Database Architecture**: Direct parameterized querying using raw PostgreSQL logic via the native Node `pg` Pool driver.
- **Flawless DevOps CI/CD**: Fully automated GitHub Actions pipeline executing localized PostgreSQL Docker containers to verify API routes upon every push.
- **Maximum API Security**: 100% shielded against SQL-injection, secured with `Helmet` XSS HTTP Headers, DoS payload protection (`10kb` limit), and strict `express-rate-limit` caching against spam bots.

---

## 💻 Tech Stack
| Tier | Technology Used |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (Native Fetch) |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (`pg` driver) |
| **Integrations** | GitHub Actions (CI/CD Automations) |
| **Defenses** | Helmet, Express-RateTracker, Parameterized SQL |
| **Hosting Configs** | Render (Node Server) & Netlify (Static DOM) |

---

## 📁 System Architecture

```text
📦 simple-expense-tracker
 ┣ 📂 backend
 ┃  ┣ 📜 package.json      # Dependencies (pg, express, helmet)
 ┃  ┣ 📜 server.js         # REST endpoints & Database pooling
 ┃  ┗ 📜 .env.example      # Abstracted environment schema
 ┣ 📂 frontend
 ┃  ┣ 📜 app.js            # DOM logic & Math Calculator
 ┃  ┣ 📜 config.js         # Dual-environment endpoint router
 ┃  ┣ 📜 index.html        # Emerald aesthetic web page
 ┃  ┗ 📜 style.css         # Modern design tokens
 ┣ 📜 .github/workflows/   # Automated Docker Postgres check
 ┣ 📜 netlify.toml         # Frontend production configurations
 ┗ 📜 render.yaml          # Backend automated build rules
```

---

## 🚀 Quickstart Local Execution

To spin up this financial suite locally in your own terminal:

### 1. Initialize & Install
```bash
git clone https://github.com/YOUR_USERNAME/simple-expense-tracker.git
cd simple-expense-tracker/backend
npm install
```

### 2. Configure Database Environment
You must have access to a PostgreSQL instance. Rename `.env.example` to `.env` and assign your connection string:
```env
DATABASE_URL=postgres://dbuser:dbpassword@127.0.0.1:5432/dbname
```

### 3. Launch Development Server
```bash
npm start
```
*The Express instance will boot on `http://localhost:3000` and immediately generate matching tables on your DB!*

### 4. Boot the UI
Open the `frontend/index.html` file into an internet browser. You're live!

---

## 🌐 Production Deployment

Ready for the world? The project includes everything required.

1. **Deploy API on Render**: Connect this repository to Render.com, and `render.yaml` will automatically map the node server. Assign your `DATABASE_URL` internally via the Render dashboard.
2. **Setup Frontend Endpoint**: In `frontend/config.js`, paste your live Render Backend URL into the routing configuration.
3. **Deploy UI on Netlify**: Connect the repository to Netlify.com. The `netlify.toml` script effortlessly handles routing your static GUI!

> *Designed completely from scratch emphasizing maximum speed, clean architecture, and impenetrable security bounds.*
```
