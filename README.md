# 🚀 LeadFlow CRM - Complete Lead Management System

A professional, full-stack CRM application built with **React + Vite**, **Node.js + Express**, **MySQL**, **Tailwind CSS**, and **JWT Authentication**.

## 📋 Features

✅ **Public Lead Submission Form** - Anyone can submit leads  
✅ **Admin Authentication** - Secure login with JWT tokens  
✅ **Admin Dashboard** - View lead statistics and analytics  
✅ **Lead Management** - View, update status, and delete leads  
✅ **Search & Filter** - Find leads by name, email, or status  
✅ **Responsive UI** - Works on desktop and mobile  
✅ **MySQL Database** - Persistent data storage  
✅ **RESTful API** - Well-documented endpoints  
✅ **Token-based Security** - Protected admin routes  

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Lucide Icons |
| Backend | Node.js, Express, JWT |
| Database | MySQL |
| State Management | React Hooks |
| Routing | React Router v6 |
| HTTP Client | Axios |

## 📁 Project Structure

```
leadflow-crm/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Contact.jsx          # Lead submission
│   │   │   ├── Dashboard.jsx        # Old dashboard
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx       # Admin login page
│   │   │       ├── AdminDashboard.jsx   # Admin stats dashboard
│   │   │       └── AdminLeads.jsx       # Lead management page
│   │   ├── App.jsx          # Main routing
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                 # Express Server
│   ├── index.js            # Main server file
│   └── package.json
│
├── database.sql            # MySQL setup script
└── README.md              # This file
```

## 🚀 Quick Start Guide

### Prerequisites

- Node.js (v14+)
- MySQL Server
- Git (optional)

### Step 1: Database Setup

1. Open **MySQL Workbench** or **MySQL Command Line**
2. Run all commands from `database.sql`:

```bash
mysql -u root -p < database.sql
```

Or copy-paste the content into MySQL Workbench.

3. This will create:
   - Database: `crm`
   - Tables: `leads`, `admins`
   - Sample data for testing

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Update password in index.js (line 16)
# Find: password: "YOUR_PASSWORD"
# Replace with your MySQL password

# Start server
npm start
# or for development with auto-restart
npm run dev
```

Backend runs on: **http://localhost:5000**

### Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:5173**

## 🔐 Admin Credentials

**Default demo credentials:**
- Email: `admin@leadflow.com`
- Password: `admin123`

⚠️ **Important**: Change these in production!

## 📚 API Documentation

### Base URL: `http://localhost:5000`

#### 1. Admin Login (Public)
```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@leadflow.com",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

#### 2. Create Lead (Public)
```
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "source": "Website"
}

Response:
{
  "id": 1,
  "message": "Lead created successfully"
}
```

#### 3. Get All Leads (Protected - Admin)
```
GET /api/leads
Authorization: Bearer <your_token>

Response: Array of leads
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "source": "Website",
    "status": "new",
    "created_at": "2024-05-08T10:30:00Z"
  }
]
```

#### 4. Get Lead by ID (Protected - Admin)
```
GET /api/leads/:id
Authorization: Bearer <your_token>
```

#### 5. Update Lead Status (Protected - Admin)
```
PUT /api/leads/:id
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "status": "converted"  // or "new"
}
```

#### 6. Delete Lead (Protected - Admin)
```
DELETE /api/leads/:id
Authorization: Bearer <your_token>
```

#### 7. Get Statistics (Protected - Admin)
```
GET /api/stats
Authorization: Bearer <your_token>

Response:
{
  "total": 10,
  "converted": 3,
  "pending": 7
}
```

## 🔄 User Flows

### Public User Flow
```
Home → Submit Lead Form → Lead Stored in Database → Admin gets notified
```

### Admin Flow
```
Admin Login → Dashboard (Stats) → View All Leads → 
  - Search/Filter Leads
  - Convert Status
  - Delete Leads
```

## 🔒 Authentication & Authorization

- **Public Routes**: Anyone can submit leads
- **Protected Routes**: Require valid JWT token in Authorization header
- **Token Expiry**: 7 days
- **Tokens**: Stored in browser's `localStorage`

## 🎨 Page Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Home | Public |
| `/contact` | Submit Lead | Public |
| `/admin/login` | Admin Login | Public |
| `/admin/dashboard` | Admin Dashboard | Admin Only |
| `/admin/leads` | Lead Management | Admin Only |

## 📊 Database Schema

### leads table
```sql
CREATE TABLE leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  source VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new',  -- 'new' or 'converted'
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### admins table
```sql
CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255),
  created_at TIMESTAMP
);
```

## 🛠 Configuration

### Backend Configuration

Edit `backend/index.js`:
```javascript
// Line 16 - MySQL Password
password: "YOUR_PASSWORD"

// Line 25 - JWT Secret (change in production)
const JWT_SECRET = "your_jwt_secret_key_change_this";

// Line 46 - Demo credentials
if (email === "admin@leadflow.com" && password === "admin123")
```

### Frontend Configuration

Edit any API endpoint in frontend components:
```javascript
// Change from localhost to your server URL in production
"http://localhost:5000/api/leads"
```

## ⚡ Performance Tips

1. **Add Pagination** - For large lead lists (current: no limit)
2. **Add Caching** - Cache frequently accessed data
3. **Add Rate Limiting** - Prevent API abuse
4. **Add Email Notifications** - Notify admin of new leads
5. **Add CSV Export** - Export leads to file

## 🔐 Security Best Practices

1. ✅ Use HTTPS in production
2. ✅ Change JWT secret key
3. ✅ Use bcrypt for password hashing
4. ✅ Add rate limiting to login endpoint
5. ✅ Add CSRF protection
6. ✅ Validate all inputs
7. ✅ Use environment variables for secrets

## 🚀 Deployment

### Frontend (Vercel / Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku / Railway / Render)
```bash
npm start
# Set environment variables in platform dashboard
```

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tailwind CSS responsive utilities
- ✅ Tested on: Desktop, Tablet, Mobile

## 🐛 Troubleshooting

### "Cannot GET /api/leads"
- Check if backend is running on port 5000
- Verify MySQL connection

### "Invalid credentials"
- Ensure email and password match admin table
- Check database.sql was executed

### CORS Errors
- Backend has CORS enabled
- Check frontend URL is allowed

### Database Connection Error
- Verify MySQL is running
- Check username/password in backend/index.js
- Ensure database `crm` exists

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Check backend server logs

## 📝 License

This project is open source and available under the MIT License.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MySQL Basics](https://dev.mysql.com/doc)
- [Tailwind CSS](https://tailwindcss.com)
- [JWT Authentication](https://jwt.io)

---

**Happy Coding! 🎉**
