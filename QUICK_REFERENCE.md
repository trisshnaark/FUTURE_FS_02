# 🚀 LeadFlow CRM - Quick Reference

## 📦 Installation Checklist

- [ ] MySQL installed and running
- [ ] Node.js installed (v14+)
- [ ] Database created (`database.sql` executed)
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend configured (MySQL password updated)
- [ ] Frontend dependencies installed (`npm install`)

## 🎯 Quick Start

```bash
# Terminal 1 - Backend
cd backend
npm install
# Update password in index.js
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## 🔗 Important URLs

| Purpose | URL |
|---------|-----|
| Homepage | http://localhost:5173 |
| Submit Lead | http://localhost:5173/contact |
| Admin Login | http://localhost:5173/admin/login |
| Admin Dashboard | http://localhost:5173/admin/dashboard |
| Manage Leads | http://localhost:5173/admin/leads |
| API Health | http://localhost:5000/ |

## 🔐 Default Admin Credentials

```
Email:    admin@leadflow.com
Password: admin123
```

## 📁 Key Files to Modify

| File | Change | Line |
|------|--------|------|
| `backend/index.js` | MySQL Password | 16 |
| `backend/index.js` | JWT Secret | 25 |
| `backend/package.json` | Add `"dev": "nodemon index.js"` | scripts |
| `frontend/.env` | API URL (production) | - |

## 🛠️ Setup Steps

### 1. Database Setup
```bash
# Copy content from database.sql and run in MySQL
mysql -u root -p < database.sql
```

### 2. Backend Setup
```bash
cd backend
npm install
# Edit index.js - change password
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📚 API Quick Reference

```bash
# Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@leadflow.com","password":"admin123"}'

# Get Token, then use in requests:
# -H "Authorization: Bearer TOKEN"

# Create Lead (Public)
POST   /api/leads
       Body: {name, email, source}

# Get All Leads (Admin)
GET    /api/leads
       Header: Authorization: Bearer TOKEN

# Update Lead (Admin)
PUT    /api/leads/:id
       Body: {status: "new" or "converted"}

# Delete Lead (Admin)
DELETE /api/leads/:id

# Get Stats (Admin)
GET    /api/stats
```

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Can't connect to MySQL | Check MySQL is running, verify password |
| Backend won't start | Check port 5000 is free, verify database exists |
| Frontend won't load | Check backend is running, check localhost:5173 |
| Login fails | Verify admin credentials in database |
| CORS error | Clear browser cache, try incognito mode |
| Port in use | Kill process: `lsof -i :5000` or `netstat -ano` |

## 📊 Database Tables

### leads
```sql
id (PRIMARY KEY)
name (VARCHAR 255)
email (VARCHAR 255)
source (VARCHAR 255)
status (VARCHAR 50) -- 'new' or 'converted'
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### admins
```sql
id (PRIMARY KEY)
email (VARCHAR 255 UNIQUE)
password (VARCHAR 255)
name (VARCHAR 255)
created_at (TIMESTAMP)
```

## 🎨 Frontend Routes

```javascript
/              → Home
/contact       → Submit Lead
/admin/login   → Admin Login
/admin/dashboard → Dashboard
/admin/leads   → Lead Management
```

## 🔐 Authentication Flow

```
1. Admin enters credentials
   ↓
2. POST /api/admin/login
   ↓
3. Backend verifies credentials
   ↓
4. JWT token generated
   ↓
5. Token stored in localStorage
   ↓
6. Token sent in Authorization header for protected routes
   ↓
7. Backend verifies token
   ↓
8. Grant/Deny access
```

## 📝 File Structure

```
leadflow-crm/
├── backend/
│   ├── index.js (Main server)
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── App.jsx (Routing)
│   │   ├── pages/ (Components)
│   │   ├── components/ (ProtectedRoute)
│   │   └── index.css (Tailwind)
│   ├── package.json
│   ├── vite.config.js
│   └── node_modules/
├── database.sql (Schema)
├── README.md
├── SETUP_GUIDE.md
└── API_DOCUMENTATION.md
```

## 💻 Development Commands

```bash
# Backend
npm start          # Production
npm run dev        # Development (auto-restart)

# Frontend
npm run dev        # Development
npm run build      # Production build
npm run preview    # Preview build
```

## 🌐 Environment Variables (Production)

```
# Backend (.env)
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=crm
JWT_SECRET=your_secret_key

# Frontend (.env)
VITE_API_URL=https://your-api-domain.com
```

## ✅ Testing Checklist

- [ ] Homepage loads
- [ ] Contact form submits successfully
- [ ] Admin login works with demo credentials
- [ ] Dashboard shows statistics
- [ ] Can search/filter leads
- [ ] Can convert lead status
- [ ] Can delete lead
- [ ] Logout works
- [ ] Unauthorized access redirected to login

## 🚀 Deployment Checklist

- [ ] Change JWT_SECRET
- [ ] Update database credentials
- [ ] Change admin password
- [ ] Enable HTTPS
- [ ] Set CORS properly
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Update API URLs
- [ ] Test all features in production

## 📞 Support Resources

- API Docs: `API_DOCUMENTATION.md`
- Setup Guide: `SETUP_GUIDE.md`
- Main Readme: `README.md`
- MySQL Docs: https://dev.mysql.com/doc/
- Express Docs: https://expressjs.com/
- React Docs: https://react.dev

## 🎓 Learn More

- JWT: https://jwt.io
- REST API: https://restfulapi.net
- Database Design: https://www.postgresql.org/docs/
- Security: https://owasp.org/

---

**Need Help?** Check SETUP_GUIDE.md or API_DOCUMENTATION.md

