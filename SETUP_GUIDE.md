# 🔧 LeadFlow CRM - Complete Setup Guide

This guide walks you through setting up the complete LeadFlow CRM system with MySQL database, Express backend, and React frontend.

## 📋 Prerequisites

Before you start, ensure you have:
- ✅ **Node.js** v14 or higher ([Download](https://nodejs.org))
- ✅ **MySQL** Server installed ([Download](https://dev.mysql.com/downloads/mysql/))
- ✅ **MySQL Workbench** (optional but recommended)
- ✅ A text editor (VS Code recommended)
- ✅ Basic understanding of terminal/command prompt

---

## 🗄️ STEP 1: Database Setup

### 1.1 Open MySQL

**Option A: Using MySQL Workbench**
1. Launch MySQL Workbench
2. Click on your local MySQL connection
3. Enter your password if prompted

**Option B: Using Command Line**
```bash
mysql -u root -p
# Enter your MySQL password
```

### 1.2 Create Database and Tables

Run all commands from `database.sql`:

**Option A: Using Workbench**
1. File → Open SQL Script
2. Navigate to `database.sql`
3. Click Execute (lightning bolt icon)

**Option B: Using Command Line**
```bash
mysql -u root -p < database.sql
```

**Option C: Copy-Paste**
Open your MySQL connection and copy-paste content from `database.sql`

### 1.3 Verify Database Creation

```sql
SHOW DATABASES;
USE crm;
SHOW TABLES;
SELECT * FROM leads;
SELECT * FROM admins;
```

You should see:
- Database `crm` created ✅
- Tables `leads` and `admins` created ✅
- Sample data inserted ✅

---

## 🔙 STEP 2: Backend Setup (Express + Node.js)

### 2.1 Navigate to Backend

```bash
cd backend
```

### 2.2 Install Dependencies

```bash
npm install
```

This installs:
- express
- mysql2
- cors
- jsonwebtoken

### 2.3 Configure MySQL Connection

Edit `backend/index.js` (around line 16):

```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",  // 👈 CHANGE THIS
  database: "crm",
});
```

Replace `YOUR_PASSWORD` with your MySQL root password.

### 2.4 (Optional) Change JWT Secret

Edit `backend/index.js` (line 25):

```javascript
const JWT_SECRET = "your_jwt_secret_key_change_this";  // Change this in production
```

### 2.5 Start Backend Server

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

✅ You should see:
```
✅ MySQL Connected Successfully
🚀 Server running on port 5000
📝 API Documentation:
   POST   /api/leads - Create lead (public)
   GET    /api/leads - Get all leads (admin)
   ...
```

**Keep this terminal open!**

---

## 🎨 STEP 3: Frontend Setup (React + Vite)

### 3.1 Open New Terminal/Command Prompt

Keep the backend running in the first terminal.

### 3.2 Navigate to Frontend

```bash
cd frontend
```

### 3.3 Install Dependencies

```bash
npm install
```

This installs:
- react
- react-router-dom
- axios
- lucide-react
- tailwindcss
- And more...

### 3.4 Start Frontend Server

```bash
npm run dev
```

✅ You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 🎉 STEP 4: Access the Application

### Homepage
Open browser and go to: **http://localhost:5173**

### Public Pages
- **Homepage**: `http://localhost:5173/` - Landing page
- **Submit Lead**: `http://localhost:5173/contact` - Lead submission form

### Admin Pages
- **Admin Login**: `http://localhost:5173/admin/login`
- **Admin Dashboard**: `http://localhost:5173/admin/dashboard`
- **Manage Leads**: `http://localhost:5173/admin/leads`

---

## 🔐 STEP 5: Admin Login

### Demo Credentials

```
Email:    admin@leadflow.com
Password: admin123
```

### Login Steps

1. Go to `http://localhost:5173/admin/login`
2. Enter email: `admin@leadflow.com`
3. Enter password: `admin123`
4. Click "Login to Dashboard"
5. ✅ You're logged in! You'll see the dashboard.

### What You Can Do

✅ View total leads  
✅ See conversion statistics  
✅ Search and filter leads  
✅ Convert leads (mark as "converted")  
✅ Delete leads  

---

## 📊 STEP 6: Test the System

### Test Public Lead Submission

1. Go to **http://localhost:5173/contact**
2. Fill in the form:
   - Name: Your Name
   - Email: your@email.com
   - Source: Website
3. Click "Submit Lead"
4. ✅ Alert: "Lead Submitted Successfully!"

### Test Admin Dashboard

1. Go to **http://localhost:5173/admin/login**
2. Login with demo credentials
3. You'll see:
   - **Total Leads** card with count
   - **Converted** card with conversion rate
   - **Pending** card with leads needing follow-up
4. Click "View All Leads →" to see detailed table

### Test Lead Management

1. Go to **Admin Dashboard** → "View All Leads"
2. You can:
   - **Search** leads by name/email
   - **Filter** by status (All/New/Converted)
   - **Convert** a lead (click green Convert button)
   - **Delete** a lead (click red Delete button)

---

## 🔑 API Endpoints (For Testing)

You can test the backend API using Postman or cURL.

### 1. Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@leadflow.com",
    "password": "admin123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

### 2. Create Lead (Public)

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "source": "API Test"
  }'
```

### 3. Get All Leads (Protected)

```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Replace `YOUR_TOKEN_HERE` with the token from login response.

### 4. Update Lead Status

```bash
curl -X PUT http://localhost:5000/api/leads/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "converted"
  }'
```

### 5. Delete Lead

```bash
curl -X DELETE http://localhost:5000/api/leads/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ⚠️ Common Issues & Fixes

### Issue 1: "Cannot connect to MySQL"

**Error**: `Connection refused` or `ECONNREFUSED`

**Solution**:
1. Check if MySQL is running
   - Windows: Services → MySQL80 (running?)
   - Mac: System Preferences → MySQL (running?)
   - Linux: `sudo systemctl status mysql`

2. Verify password in `backend/index.js`
3. Check MySQL user is "root" and database is "crm"

### Issue 2: "Cannot GET /api/leads"

**Error**: 404 on browser for API

**Solution**:
1. Ensure backend is running (check terminal)
2. Verify backend is on port 5000
3. Try accessing `http://localhost:5000/` - should show JSON message

### Issue 3: "Invalid credentials" on admin login

**Error**: Login fails with demo credentials

**Solution**:
1. Check `database.sql` was run successfully
2. Query database: `SELECT * FROM admins;`
3. Verify row with `admin@leadflow.com` exists
4. Try credentials again

### Issue 4: CORS Error in Console

**Error**: `Cross-Origin Request Blocked`

**Solution**:
1. Backend already has CORS enabled
2. Clear browser cache: Ctrl+Shift+Delete
3. Try in private/incognito window
4. Check backend terminal for errors

### Issue 5: "Module not found" errors

**Error**: `Cannot find module 'express'`

**Solution**:
```bash
# Make sure you're in correct directory
cd backend
# or
cd frontend

# Reinstall dependencies
npm install

# Clear npm cache
npm cache clean --force
npm install
```

### Issue 6: Port Already in Use

**Error**: `Port 5000 already in use` or `Port 5173 already in use`

**Solution**:

**Windows**:
```bash
# Find process using port
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Mac/Linux**:
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

---

## 🚀 Production Deployment

### Backend Deployment (Heroku)

1. Create Heroku account
2. Install Heroku CLI
3. `heroku login`
4. `heroku create your-app-name`
5. `git push heroku main`

### Frontend Deployment (Vercel)

1. Create Vercel account
2. `npm i -g vercel`
3. `vercel`
4. Update API URL in frontend code

---

## 🔒 Security Checklist

- [ ] Change MySQL password (if not already done)
- [ ] Change JWT_SECRET in `backend/index.js`
- [ ] Use environment variables for secrets
- [ ] Add password hashing for admin accounts
- [ ] Enable HTTPS in production
- [ ] Add rate limiting to APIs
- [ ] Validate all user inputs
- [ ] Use HTTPS for all connections

---

## 📚 File Guide

```
leadflow-crm/
├── backend/
│   ├── index.js              ← Main server file
│   ├── package.json          ← Backend dependencies
│   └── README.md             ← Backend docs
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx           ← Main routing
│   │   ├── pages/            ← Page components
│   │   ├── components/       ← Reusable components
│   │   ├── main.jsx          ← Entry point
│   │   └── index.css         ← Tailwind styles
│   ├── package.json          ← Frontend dependencies
│   ├── vite.config.js        ← Vite configuration
│   └── README.md             ← Frontend docs
│
├── database.sql              ← Database setup
└── README.md                 ← Main documentation
```

---

## 📞 Getting Help

1. **Check Terminal Logs** - Backend shows detailed errors
2. **Browser Console** - Frontend errors visible here (F12)
3. **Database** - Verify data with `SELECT` queries
4. **Verify Ports** - Backend on 5000, Frontend on 5173
5. **Restart Services** - Sometimes a fresh start fixes issues

---

## 🎓 Next Steps

After successful setup:

1. ✅ Play with the application
2. ✅ Test all features
3. ✅ Understand the code
4. ✅ Add new features (search, filters, etc.)
5. ✅ Deploy to production
6. ✅ Share your project!

---

**Congratulations! Your CRM is ready to use! 🎉**

