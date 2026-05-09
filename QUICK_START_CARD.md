# 🚀 QUICK START CARD

## LeadFlow CRM - Get Running in 5 Minutes

```
╔══════════════════════════════════════════════════════════╗
║        LEADFLOW CRM - PRODUCTION READY ✅                ║
║                                                          ║
║              GET STARTED IN 5 MINUTES                    ║
╚══════════════════════════════════════════════════════════╝
```

---

## 📋 SETUP CHECKLIST

### Step 1: Backend (2 minutes)
```bash
cd backend
cp config/.env.example .env
npm install
```

**Edit `.env` with your MySQL password**

```bash
npm start
```
✅ Backend runs at http://localhost:5000

---

### Step 2: Frontend (2 minutes)
```bash
# Open NEW terminal window
cd frontend
npm install
npm run dev
```
✅ Frontend runs at http://localhost:5173

---

### Step 3: Database (1 minute)
```bash
mysql -u root -p
CREATE DATABASE crm;
USE crm;
SOURCE ../backend/database.sql;
```
✅ Database is ready

---

## 🎯 ACCESS YOUR CRM

**Frontend:** http://localhost:5173
**Backend:** http://localhost:5000/api

### Demo Login
- **Email:** admin@crm.com
- **Password:** admin123

---

## ✨ FEATURES YOU HAVE

✅ Admin login
✅ Lead dashboard
✅ Create leads
✅ Edit leads
✅ Delete leads
✅ Statistics
✅ Search & filter
✅ Responsive design

---

## 📚 DOCUMENTATION

| Document | Purpose |
|----------|---------|
| START_HERE.md | Read this first |
| SETUP_GUIDE.md | Detailed setup |
| QUICK_REFERENCE.md | Commands |
| API_DOCUMENTATION.md | API endpoints |
| INTEGRATION_GUIDE.md | Full overview |

---

## 🔍 FILE LOCATIONS

```
leadflow-crm/
├── frontend/          ← React app
├── backend/           ← Express API
│   └── database.sql   ← Database schema
└── documentation/     ← 21+ guides
```

---

## 🆘 COMMON ISSUES

**MySQL Connection Error?**
→ Check your password in backend/.env

**Port 5000 already in use?**
→ Change PORT in backend/.env

**npm: command not found?**
→ Install Node.js from nodejs.org

**Can't login?**
→ Make sure database.sql was imported

---

## ✅ VERIFICATION

After setup, verify everything works:

```bash
# Test backend
curl http://localhost:5000/api/health

# Test login (get token)
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com","password":"admin123"}'

# Should return token in response
```

---

## 🎉 YOU'RE DONE!

Your CRM is ready to use! Now:

1. Open http://localhost:5173
2. Click "Admin Login"
3. Use: admin@crm.com / admin123
4. Create, edit, delete leads
5. View statistics

---

## 📞 NEED HELP?

- **Setup Issues?** → SETUP_GUIDE.md
- **API Questions?** → API_DOCUMENTATION.md
- **Quick Commands?** → QUICK_REFERENCE.md
- **Full Overview?** → INTEGRATION_GUIDE.md

---

## 📝 PROJECT INFO

**Status:** ✅ Production Ready
**Version:** 1.0.0
**Components:** Frontend ✅ Backend ✅ Database ✅
**Documentation:** 21+ files ✅
**Ready to Deploy:** YES ✅

---

```
┌─────────────────────────────────────┐
│  YOU HAVE EVERYTHING YOU NEED! 🎉   │
│                                      │
│  Start with: START_HERE.md          │
│  Then follow: SETUP_GUIDE.md        │
│  Run in: 5 minutes                  │
│  Deploy to: Any server              │
└─────────────────────────────────────┘
```

**Happy Coding!** 💻🚀

---

**Last Updated:** Today | **Status:** ✅ Ready | **Support:** Full Documentation Included
