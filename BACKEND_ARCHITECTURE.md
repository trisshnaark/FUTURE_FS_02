# Backend Architecture & Data Flow

## 🏗️ Backend Architecture Overview

Your backend has been reorganized into a professional, modular structure optimized for scalability and maintenance.

---

## 📊 Component Diagram

```
┌─────────────────────────────────────────────────────────┐
│              CLIENT (React Frontend)                     │
│  (Home, Contact, AdminLogin, Dashboard, AdminLeads)    │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP Requests
                       ▼
┌─────────────────────────────────────────────────────────┐
│          Express Server (server.js)                      │
│                                                          │
│  ┌────────────────────────────────────────────────┐   │
│  │ Middleware Stack                               │   │
│  │ • CORS                                         │   │
│  │ • JSON Parser                                 │   │
│  │ • Request Logger                              │   │
│  └────────────────────────────────────────────────┘   │
│                       │                                 │
│  ┌────────────────────┼────────────────────┐          │
│  │                    │                    │          │
│  ▼                    ▼                    ▼          │
│ /api/admin         /api/leads            /api/health │
│   │                  │                      │          │
│   ▼                  ▼                      ▼          │
│ routes/          routes/                Health Check   │
│ admin.js         leads.js                             │
│                                                       │
│  ┌──────────────────┬───────────────────────┐        │
│  │ authMiddleware.js (JWT Verification)     │        │
│  │ (Applied to protected endpoints)         │        │
│  └──────────────────┬───────────────────────┘        │
└──────────────────────┼──────────────────────────────────┘
                       │ Database Queries
                       ▼
┌─────────────────────────────────────────────────────────┐
│              MySQL Database (crm)                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Config/db.js (Connection Pool)                  │ │
│  │ • Host: localhost                              │ │
│  │ • User: root                                   │ │
│  │ • Database: crm                                │ │
│  └──────────────────────────────────────────────────┘ │
│                       │                                 │
│        ┌──────────────┴──────────────┐               │
│        │                            │               │
│        ▼                            ▼               │
│   leads table              admins table            │
│   • id                     • id                    │
│   • name                   • email                 │
│   • email                  • password              │
│   • phone                  • name                  │
│   • source                 • created_at            │
│   • status                                        │
│   • notes                                         │
│   • created_at                                    │
│   • updated_at                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow - Admin Login Example

```
1. CLIENT: POST /api/admin/login
           {email: "admin@crm.com", password: "admin123"}
                      │
                      ▼
2. SERVER: Receives request at routes/admin.js
                      │
                      ▼
3. VALIDATION: Check email and password provided
                      │
                      ▼
4. DATABASE: Query: SELECT * FROM admins WHERE email = ?
           (config/db.js executes)
                      │
                      ▼
5. VERIFY: Compare provided password with database password
                      │
                      ▼
6. GENERATE: JWT token (7-day expiration)
           using JWT_SECRET from environment
                      │
                      ▼
7. RESPONSE: {token, admin_data}
                      │
                      ▼
8. CLIENT: Stores token in localStorage
          Redirects to /admin/dashboard
```

---

## 🔐 Request Flow - Protected Route Example

```
1. CLIENT: GET /api/leads
           Authorization: "Bearer <jwt_token>"
                      │
                      ▼
2. MIDDLEWARE: authMiddleware.js checks header
                      │
              ┌───────┴───────┐
              │               │
          ✅ Valid         ❌ Invalid
              │               │
              ▼               ▼
         Continue        Error 401
              │          "No token or
              │           invalid token"
              ▼
3. ROUTES: routes/leads.js processes request
                      │
                      ▼
4. DATABASE: Query: SELECT * FROM leads
           (config/db.js executes)
                      │
                      ▼
5. RESPONSE: [leads array]
                      │
                      ▼
6. CLIENT: Receives and displays leads
```

---

## 📁 File Organization & Dependencies

```
server.js (Entry Point)
│
├─── Imports: routes/admin.js
│    │
│    ├─── Imports: config/db.js (database connection)
│    ├─── Imports: authMiddleware.js (for GET /profile)
│    │
│    └─── Routes:
│         • POST /api/admin/login
│         • GET /api/admin/profile (Protected)
│
├─── Imports: routes/leads.js
│    │
│    ├─── Imports: config/db.js (database connection)
│    ├─── Imports: authMiddleware.js (for all GET/PUT/DELETE)
│    │
│    └─── Routes:
│         • POST /api/leads
│         • GET /api/leads (Protected)
│         • GET /api/leads/:id (Protected)
│         • PUT /api/leads/:id (Protected)
│         • DELETE /api/leads/:id (Protected)
│         • GET /api/leads/stats/overview (Protected)
│
├─── config/db.js
│    │
│    └─── Exports: MySQL connection pool
│         Uses: .env variables
│
├─── middleware/authMiddleware.js
│    │
│    └─── Exports: JWT verification function
│         Uses: JWT_SECRET from environment
│
└─── External Dependencies:
     • express (HTTP framework)
     • mysql2 (Database driver)
     • cors (Cross-origin support)
     • jsonwebtoken (JWT handling)
     • dotenv (Environment variables)
```

---

## 🎯 Data Models

### Admin Model
```javascript
{
  id: 1,
  email: "admin@crm.com",
  password: "admin123",
  name: "Admin User",
  created_at: "2024-01-01T00:00:00.000Z"
}
```

### Lead Model
```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  source: "Website",           // Website, Email, Phone, Referral
  status: "New",               // New, Contacted, Converted
  notes: "High priority lead",
  created_at: "2024-01-01T10:00:00.000Z",
  updated_at: "2024-01-01T10:00:00.000Z"
}
```

### JWT Token Structure
```javascript
{
  id: 1,
  email: "admin@crm.com",
  name: "Admin User",
  iat: 1234567890,
  exp: 1234567890 + (7 * 24 * 60 * 60)  // 7 days from now
}
```

---

## 🔗 API Endpoint Map

```
/api/
├── /admin/
│   ├── POST   /login              → Generate JWT token
│   └── GET    /profile            → Get admin info (Protected)
│
├── /leads/
│   ├── GET    /                   → Get all leads (Protected)
│   ├── GET    /:id                → Get one lead (Protected)
│   ├── POST   /                   → Create lead
│   ├── PUT    /:id                → Update lead (Protected)
│   ├── DELETE /:id                → Delete lead (Protected)
│   └── GET    /stats/overview     → Get statistics (Protected)
│
└── /health                        → Server health check
```

---

## 🔐 Authentication Flow

```
User Login
    │
    ▼
POST /api/admin/login
    │
    ├─ Validate email & password
    │
    ├─ Query database
    │
    ├─ Check password match
    │
    ├─ Create JWT token
    │     ├─ Payload: {id, email, name}
    │     ├─ Secret: JWT_SECRET from .env
    │     └─ Expiry: 7 days
    │
    └─ Return token to client

Client Storage
    │
    ├─ localStorage.setItem('token', jwt_token)
    │
    └─ Include in all protected requests
          Authorization: "Bearer <token>"

Protected Route Access
    │
    ├─ Middleware checks Authorization header
    │
    ├─ Extract token (remove "Bearer " prefix)
    │
    ├─ Verify signature with JWT_SECRET
    │
    ├─ Check expiration
    │
    ├─ Decode and attach user to request
    │
    └─ Pass to route handler OR return 401 error
```

---

## 💾 Database Query Examples

### Create Lead
```sql
INSERT INTO leads 
(name, email, phone, source, notes, status) 
VALUES 
('John Doe', 'john@example.com', '1234567890', 'Website', 'Notes', 'New');
```

### Get All Leads
```sql
SELECT * FROM leads 
ORDER BY created_at DESC;
```

### Update Lead
```sql
UPDATE leads 
SET name = ?, email = ?, phone = ?, source = ?, status = ?, notes = ?, updated_at = NOW()
WHERE id = ?;
```

### Delete Lead
```sql
DELETE FROM leads 
WHERE id = ?;
```

### Get Statistics
```sql
SELECT 
  COUNT(*) as total_leads,
  SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) as new_leads,
  SUM(CASE WHEN status = 'Contacted' THEN 1 ELSE 0 END) as contacted_leads,
  SUM(CASE WHEN status = 'Converted' THEN 1 ELSE 0 END) as converted_leads
FROM leads;
```

---

## 🌐 Environment Configuration

### `.env` File Structure
```bash
PORT=5000

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=crm

# Security
JWT_SECRET=your_secret_key

# Mode
NODE_ENV=development
```

### How Environment Variables Flow
```
.env file
    │
    ▼
process.env (Node.js)
    │
    ├── MYSQL_HOST      → config/db.js
    ├── MYSQL_USER      → config/db.js
    ├── MYSQL_PASSWORD  → config/db.js
    ├── MYSQL_DATABASE  → config/db.js
    │
    └── JWT_SECRET      → middleware/authMiddleware.js
                        → routes/admin.js
```

---

## ✨ Scalability Features

### Modular Structure
- Routes separated by concern
- Middleware is reusable
- Configuration is externalized
- Database connection is pooled

### Easy to Extend
```javascript
// Add new route
app.use('/api/newroute', require('./routes/newroute'));

// Add new middleware
app.use(require('./middleware/newmiddleware'));

// Change database
// Just update config/db.js
```

### Performance Optimized
- Database connection pooling
- Auto-reconnection logic
- Parameterized queries
- Request logging
- Error handling

---

## 🎯 Key Files and Their Roles

| File | Role | Responsibility |
|------|------|-----------------|
| server.js | Orchestrator | Bootstrap app, mount routes |
| config/db.js | Database | MySQL connection management |
| config/.env.example | Template | Environment configuration |
| middleware/authMiddleware.js | Security | JWT verification |
| routes/admin.js | Handler | Admin login & profile |
| routes/leads.js | Handler | Lead CRUD & stats |

---

## 📈 How to Monitor

### Console Logs
- "✅ MySQL Connected Successfully" - Database ready
- "📨 METHOD PATH" - All requests logged
- "🚀 Server running on http://localhost:5000" - Server started

### Error Messages
- "❌ MySQL Connection Error" - Database connection failed
- "No token provided" - Missing authorization header
- "Invalid or expired token" - JWT verification failed

---

## 🚀 Deployment Architecture

```
Development:
localhost:5173 (Frontend) ──→ localhost:5000 (Backend) ──→ MySQL:3306

Production:
your-frontend.com (Frontend) ──→ your-api.com (Backend) ──→ MySQL (Managed)

Same code, different .env values!
```

---

## 📚 Related Documentation

- [BACKEND_SUMMARY.md](./backend/BACKEND_SUMMARY.md) - Detailed backend guide
- [MODULAR_STRUCTURE.md](./backend/MODULAR_STRUCTURE.md) - Architecture details
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Setup instructions

---

**Backend Architecture:** ✅ Production-Ready
**Scalability:** ✅ Highly Modular
**Security:** ✅ JWT-Protected
**Documentation:** ✅ Comprehensive

Your backend is ready for development and production use! 🚀
