# Portfolio Backend & CMS (MERN Stack)

A lightweight, secure Node.js + Express + MongoDB backend and CMS API for your portfolio website.

## 🌟 Key Features
- **Public Portfolio API (`GET /api/portfolio`)**: Serves profile data, projects, skills, and design case studies to the public frontend.
- **Private Admin Dashboard (`/admin`)**: A password-protected CMS where only you can add, edit, or delete portfolio content.
- **Offline & Initial Fallback**: The frontend automatically uses built-in fallback data if the backend or database is offline, ensuring 100% uptime for recruiters.
- **Contact Messages (`/api/messages`)**: Stores incoming recruiter messages in MongoDB so you never miss an inquiry.
- **Database Seeder (`npm run seed`)**: Seeds your database in 1 second with all your existing portfolio data.

---

## 🚀 Quick Start Guide

### 1. Configure MongoDB Connection
In `server/.env`, replace `MONGO_URI` with your MongoDB connection string (e.g. from MongoDB Atlas or local MongoDB):

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=super_secret_portfolio_jwt_key_2026
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:5173
```

### 2. Seed Initial Portfolio Data
Populate MongoDB with your current projects, skills, profile, and admin account:

From the root directory:
```bash
npm run server:seed
```
Or inside `server/`:
```bash
npm run seed
```

### 3. Start the Backend Server
From the root directory:
```bash
npm run server
```
Or inside `server/`:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

---

## 🔐 Accessing the Admin Dashboard
1. Open your browser and go to: `http://localhost:5173/admin`
2. If not logged in, you will be redirected to `/admin/login`.
3. Sign in with your admin credentials:
   - **Username**: `admin` (or value in `server/.env`)
   - **Password**: `admin123` (or value in `server/.env`)
4. Use the dashboard to edit your profile, add/edit projects, update skills, or view messages. Recruiters who visit `http://localhost:5173/` will only see the clean public portfolio without edit options!
