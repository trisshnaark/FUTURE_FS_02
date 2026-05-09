# Backend Modular Structure - Complete Setup Guide

## ✅ Backend Modularization Complete

The backend has been restructured from a monolithic `index.js` to a production-ready modular architecture.

### 📁 New Backend Structure

```
backend/
├── server.js                 # Main entry point
├── config/
│   ├── db.js                # MySQL connection setup
│   └── .env.example         # Environment variables template
├── middleware/
│   └── authMiddleware.js    # JWT authentication middleware
├── routes/
│   ├── admin.js             # Admin authentication routes
│   └── leads.js             # Lead management routes
├── database.sql             # Database schema
├── package.json             # Dependencies
└── index.js                 # (Old file - can be deleted)
```

## 🚀 How to Run

### 1. **Setup Environment**
```bash
cd backend
cp config/.env.example .env
```

Edit `.env` with your MySQL credentials:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=YOUR_PASSWORD
MYSQL_DATABASE=crm
JWT_SECRET=your_jwt_secret_key
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Setup Database**
```bash
mysql -u root -p crm < database.sql
```

### 4. **Run Server**
```bash
npm start          # Production mode
npm run dev        # Development with nodemon
```

Server runs on `http://localhost:5000`

## 📋 API Endpoints

### Admin Routes (`/api/admin`)
- `POST /api/admin/login` - Login with email & password
- `GET /api/admin/profile` - Get admin profile (Protected)

### Lead Routes (`/api/leads`)
- `GET /api/leads` - Get all leads (Protected)
- `GET /api/leads/:id` - Get lead by ID (Protected)
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead (Protected)
- `DELETE /api/leads/:id` - Delete lead (Protected)
- `GET /api/leads/stats/overview` - Get statistics (Protected)

## 🔐 Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

**Demo Admin Credentials:**
- Email: `admin@crm.com`
- Password: `admin123`

Token expires in 7 days.

## 📝 File Descriptions

### `server.js`
Main application entry point. Initializes Express app, imports routes, sets up middleware.

### `config/db.js`
MySQL connection pool configuration. Reads credentials from `.env` file.

### `middleware/authMiddleware.js`
JWT verification middleware. Validates token and attaches user info to request.

### `routes/admin.js`
Admin authentication endpoints:
- Login & token generation
- Admin profile retrieval

### `routes/leads.js`
Lead management endpoints:
- CRUD operations for leads
- Statistics aggregation
- Protected with JWT middleware

## ✨ Key Features

✅ Modular architecture for maintainability
✅ JWT-based authentication
✅ Protected routes with middleware
✅ MySQL database with proper schema
✅ Environment variable configuration
✅ Error handling and validation
✅ Request logging
✅ Stats aggregation queries
✅ Scalable structure for future features

## 🔄 Migration from Old Structure

The old `index.js` has been split into:
1. **server.js** - App initialization
2. **config/db.js** - Database connection
3. **middleware/authMiddleware.js** - Authentication logic
4. **routes/admin.js** - Admin endpoints
5. **routes/leads.js** - Leads endpoints

You can safely delete `index.js` after confirming everything works.

## 🧪 Testing

Use Postman or cURL to test endpoints:

```bash
# Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com","password":"admin123"}'

# Get all leads (use token from login response)
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer <token>"

# Create lead
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","source":"Website"}'
```

## 📚 Documentation Files

- [SETUP_GUIDE.md](../SETUP_GUIDE.md) - Complete setup instructions
- [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) - Detailed API reference
- [QUICK_REFERENCE.md](../QUICK_REFERENCE.md) - Quick command reference
