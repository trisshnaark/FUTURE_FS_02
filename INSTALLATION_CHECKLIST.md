# ✅ LeadFlow CRM - Installation & Verification Checklist

Use this checklist to ensure everything is set up correctly.

---

## 🎯 Pre-Installation Checklist

### System Requirements
- [ ] Node.js v14 or higher installed
  - Verify: `node --version`
  - Should show: v14.0.0 or higher
- [ ] npm installed
  - Verify: `npm --version`
  - Should show: 6.0.0 or higher
- [ ] MySQL Server installed and running
  - Verify: `mysql --version`
  - MySQL should be running (check Services)
- [ ] MySQL Workbench installed (optional but recommended)
- [ ] Text editor (VS Code recommended)
- [ ] Terminal/Command Prompt access
- [ ] Internet connection

### Project Files
- [ ] All project files downloaded
- [ ] database.sql file present
- [ ] backend folder present
- [ ] frontend folder present
- [ ] Documentation files present
  - [ ] README.md
  - [ ] SETUP_GUIDE.md
  - [ ] API_DOCUMENTATION.md

---

## 🗄️ Database Setup Checklist

### MySQL Connection
- [ ] MySQL Server is running
  - Windows: Check Services (MySQL80 running)
  - Mac: Check System Preferences
  - Linux: `sudo systemctl status mysql`
- [ ] You can connect to MySQL
  - Verify: `mysql -u root -p`
  - Should prompt for password
- [ ] MySQL root password known

### Database Creation
- [ ] database.sql file located
- [ ] Opened MySQL (Workbench or command line)
- [ ] Executed all commands from database.sql
- [ ] Database `crm` created
  - Verify: `SHOW DATABASES;` (look for `crm`)
- [ ] Table `leads` created
  - Verify: `USE crm; SHOW TABLES;`
- [ ] Table `admins` created
  - Verify: `USE crm; SHOW TABLES;`
- [ ] Sample data inserted
  - Verify: `SELECT * FROM admins;` (should see admin@leadflow.com)
- [ ] Leads table has sample data
  - Verify: `SELECT COUNT(*) FROM leads;` (should see count)

### Database Verification
```sql
-- Run these commands to verify:
USE crm;
SHOW TABLES;
SELECT * FROM admins;
SELECT COUNT(*) as total_leads FROM leads;
```

Expected output:
- 2 tables (admins, leads)
- 1 admin with email admin@leadflow.com
- 5+ sample leads

---

## 🔙 Backend Setup Checklist

### Navigate to Backend
- [ ] Open terminal
- [ ] Navigate to backend folder
  - Command: `cd backend`
- [ ] Verify you're in backend directory
  - You should see: `index.js`, `package.json`

### Install Dependencies
- [ ] Run npm install
  - Command: `npm install`
  - Wait for completion (2-3 minutes)
- [ ] No errors shown
- [ ] node_modules folder created
- [ ] package-lock.json created

### Configure Backend
- [ ] Open backend/index.js
- [ ] Find line 16: `password: "YOUR_PASSWORD"`
- [ ] Replace `YOUR_PASSWORD` with your MySQL password
- [ ] Save file (Ctrl+S)
- [ ] Verify password is correct

### Start Backend Server
- [ ] Run backend
  - Command: `npm start`
- [ ] See these messages:
  - ✅ "MySQL Connected Successfully"
  - ✅ "🚀 Server running on port 5000"
  - ✅ "📝 API Documentation:"
- [ ] No errors shown
- [ ] Terminal shows: "Server is ready"

### Keep Backend Running
- [ ] Backend terminal remains open
- [ ] Port 5000 is listening
- [ ] You can see server logs

---

## 🎨 Frontend Setup Checklist

### Open New Terminal
- [ ] Keep backend terminal open
- [ ] Open NEW terminal/command prompt
- [ ] Navigate to frontend folder
  - Command: `cd frontend`
- [ ] Verify you're in frontend directory
  - You should see: `src`, `package.json`, `index.html`

### Install Dependencies
- [ ] Run npm install
  - Command: `npm install`
  - Wait for completion (3-5 minutes)
- [ ] No errors shown
- [ ] node_modules folder created
- [ ] package-lock.json created

### Start Frontend Server
- [ ] Run frontend dev server
  - Command: `npm run dev`
- [ ] See message:
  - ✅ "VITE v5.x.x ready in xxx ms"
  - ✅ "Local: http://localhost:5173/"
- [ ] No errors shown
- [ ] Frontend is ready at http://localhost:5173

### Keep Frontend Running
- [ ] Frontend terminal remains open
- [ ] Port 5173 is listening
- [ ] You can see dev server logs

---

## 🌐 Access the Application

### Both Services Running
- [ ] Backend running on port 5000 (Terminal 1)
- [ ] Frontend running on port 5173 (Terminal 2)
- [ ] MySQL running in background
- [ ] All three services accessible

### Open Browser
- [ ] Open web browser (Chrome, Firefox, Safari, Edge)
- [ ] Go to: http://localhost:5173
- [ ] Wait 2-3 seconds for page to load
- [ ] Homepage should appear ✅

---

## 🧪 Testing Checklist

### Homepage Test
- [ ] URL: http://localhost:5173
- [ ] Page loads without errors
- [ ] See "Welcome to LeadFlow CRM" title
- [ ] See 3 feature cards
- [ ] See 2 buttons: "Submit Lead" and "Admin Login"
- [ ] Console (F12) shows no errors

### Contact Form Test
- [ ] Click "Submit Your Lead" button
- [ ] Form page loads (http://localhost:5173/contact)
- [ ] Form has 3 fields: Name, Email, Source
- [ ] Fill with test data:
  - Name: Test User
  - Email: test@example.com
  - Source: Test
- [ ] Click "Submit Lead"
- [ ] See success message: "✅ Lead Submitted Successfully!"
- [ ] Form clears after submission
- [ ] Check database: `SELECT * FROM leads;` (new lead should appear)

### Admin Login Test
- [ ] Click "Admin Login" button
- [ ] Login page loads (http://localhost:5173/admin/login)
- [ ] See login form with 2 fields
- [ ] Enter credentials:
  - Email: `admin@leadflow.com`
  - Password: `admin123`
- [ ] Click "Login to Dashboard"
- [ ] Dashboard page loads (http://localhost:5173/admin/dashboard)
- [ ] See 3 stat cards:
  - Total Leads (showing count)
  - Converted (showing count & %)
  - Pending (showing count)
- [ ] See "View All Leads" button

### Dashboard Test
- [ ] Verify admin is logged in
- [ ] See all 3 stat cards
- [ ] Stats show correct numbers
- [ ] Click "View All Leads →" button
- [ ] Leads page opens (http://localhost:5173/admin/leads)

### Leads Management Test
- [ ] See search box
- [ ] See filter dropdown
- [ ] See table with leads
- [ ] Try searching by name
- [ ] Try filtering by status
- [ ] Try clicking "Convert" button on a lead
- [ ] Try clicking "Delete" button on a lead
- [ ] Confirm deletion
- [ ] See "✅ Lead deleted successfully!" message
- [ ] Lead removed from table

### API Test
- [ ] Open Postman or terminal
- [ ] Test health endpoint:
  ```bash
  curl http://localhost:5000/
  ```
  - Should return: `{"message":"LeadFlow CRM API running successfully"}`
- [ ] All endpoints responding

### Logout Test
- [ ] In admin dashboard, find logout button
- [ ] Click logout button
- [ ] Redirected to home page
- [ ] Token removed from storage
- [ ] Try accessing /admin/dashboard
- [ ] Redirected to /admin/login ✅

---

## ✅ Final Verification

### Services Status
- [ ] MySQL: ✅ Running
- [ ] Backend: ✅ Running on port 5000
- [ ] Frontend: ✅ Running on port 5173
- [ ] Database: ✅ Created with schema & data

### Pages Accessible
- [ ] http://localhost:5173 → Home ✅
- [ ] http://localhost:5173/contact → Contact form ✅
- [ ] http://localhost:5173/admin/login → Admin login ✅
- [ ] http://localhost:5173/admin/dashboard → Dashboard (after login) ✅
- [ ] http://localhost:5173/admin/leads → Lead management (after login) ✅

### Features Working
- [ ] Public lead submission ✅
- [ ] Admin login ✅
- [ ] Dashboard with stats ✅
- [ ] Lead search ✅
- [ ] Lead filtering ✅
- [ ] Lead conversion ✅
- [ ] Lead deletion ✅
- [ ] Logout ✅

### No Errors
- [ ] Backend: No console errors ✅
- [ ] Frontend: No console errors ✅
- [ ] Browser console: No errors (F12) ✅
- [ ] Database: All queries execute ✅

---

## 🚀 You're Ready!

If all checkboxes above are checked ✅, your system is:
- ✅ Properly installed
- ✅ Successfully configured
- ✅ Fully functional
- ✅ Ready for use
- ✅ Ready for customization
- ✅ Ready for deployment

---

## 🆘 If Something Failed

### Checklist Incomplete?
1. Go back to failing step
2. Review [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. Check "Common Issues & Fixes" section
4. Verify error message
5. Try again or seek help

### Error Messages?
1. Copy exact error message
2. Search in [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. Check "Troubleshooting" section
4. Try suggested solution
5. Restart service and retry

### Services Won't Start?
1. Check if port is in use
   ```bash
   # Find process using port 5000
   lsof -i :5000  (Mac/Linux)
   netstat -ano | findstr :5000  (Windows)
   ```
2. Kill conflicting process
3. Try starting again
4. If still fails, check logs

### Database Won't Connect?
1. Verify MySQL is running
2. Verify password is correct in backend/index.js
3. Verify database `crm` exists
4. Verify tables exist
5. Check MySQL logs for errors

---

## 📞 Getting Help

If stuck:
1. Review [SETUP_GUIDE.md](SETUP_GUIDE.md#-common-issues--fixes)
2. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md#-troubleshooting-quick-fixes)
3. Look at terminal/console logs
4. Verify all services running
5. Restart services
6. Check documentation again

---

## 📝 Notes

- This checklist ensures everything works
- Complete step-by-step
- Don't skip steps
- Take time if needed
- Ask for help if stuck
- Document any issues for future reference

---

## ✨ Success Criteria

Your LeadFlow CRM is successfully installed when:

1. ✅ All three services running (MySQL, Backend, Frontend)
2. ✅ All 5 pages accessible and loading
3. ✅ Can submit public leads
4. ✅ Can login as admin
5. ✅ Can view dashboard with stats
6. ✅ Can manage leads (view, search, filter, convert, delete)
7. ✅ No errors in console or terminal
8. ✅ All tests passing

---

**Congratulations! 🎉 Your LeadFlow CRM is ready to use!**

---

*Last Updated: May 8, 2024*

