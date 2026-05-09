# 📚 LeadFlow CRM API Documentation

Complete API reference for LeadFlow CRM backend.

## Base URL

```
http://localhost:5000
```

## 🔒 Authentication

API uses **JWT (JSON Web Tokens)** for authentication.

### Getting a Token

First, login as admin to get a token:

```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@leadflow.com",
  "password": "admin123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

### Using Token in Requests

Include token in Authorization header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

Example:
```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

## 🌍 Endpoints

### 1. Admin Login

**Endpoint**: `POST /api/admin/login`

**Access**: Public

**Description**: Authenticate admin and get JWT token

**Request**:
```json
{
  "email": "admin@leadflow.com",
  "password": "admin123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGxlYWRmbG93LmNvbSIsImlhdCI6...",
  "message": "Login successful"
}
```

**Error** (401 Unauthorized):
```json
{
  "message": "Invalid credentials"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@leadflow.com","password":"admin123"}'
```

---

### 2. Create Lead

**Endpoint**: `POST /api/leads`

**Access**: Public

**Description**: Create a new lead (for public users)

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "source": "Website"
}
```

**Request Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Lead's full name (max 255 chars) |
| email | String | Yes | Lead's email address |
| source | String | Yes | How they heard about you (Website, Referral, Google Ads, etc.) |

**Response** (200 OK):
```json
{
  "id": 1,
  "message": "Lead created successfully"
}
```

**Error** (500 Internal Server Error):
```json
{
  "error": "Error message here"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "source": "LinkedIn"
  }'
```

**JavaScript Example** (Fetch API):
```javascript
fetch('http://localhost:5000/api/leads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@example.com',
    source: 'LinkedIn'
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

**Axios Example**:
```javascript
import axios from 'axios';

axios.post('http://localhost:5000/api/leads', {
  name: 'Jane Smith',
  email: 'jane@example.com',
  source: 'LinkedIn'
})
.then(res => console.log(res.data))
.catch(err => console.error(err))
```

---

### 3. Get All Leads

**Endpoint**: `GET /api/leads`

**Access**: Protected (Admin only)

**Description**: Retrieve all leads from the database

**Required Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "source": "Website",
    "status": "new",
    "created_at": "2024-05-08T10:30:00Z",
    "updated_at": "2024-05-08T10:30:00Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "source": "Referral",
    "status": "converted",
    "created_at": "2024-05-07T15:45:00Z",
    "updated_at": "2024-05-08T09:15:00Z"
  }
]
```

**Error** (401 Unauthorized):
```json
{
  "message": "No token provided"
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 4. Get Lead by ID

**Endpoint**: `GET /api/leads/:id`

**Access**: Protected (Admin only)

**Description**: Get details of a specific lead

**URL Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | Integer | Yes | Lead ID |

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "source": "Website",
  "status": "new",
  "created_at": "2024-05-08T10:30:00Z",
  "updated_at": "2024-05-08T10:30:00Z"
}
```

**Error** (404 Not Found):
```json
{
  "message": "Lead not found"
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:5000/api/leads/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 5. Update Lead Status

**Endpoint**: `PUT /api/leads/:id`

**Access**: Protected (Admin only)

**Description**: Update lead status (new → converted)

**URL Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | Integer | Yes | Lead ID |

**Request**:
```json
{
  "status": "converted"
}
```

**Status Values**:
- `"new"` - New lead (default)
- `"converted"` - Lead has been converted

**Response** (200 OK):
```json
{
  "message": "Lead updated successfully"
}
```

**Error** (400 Bad Request):
```json
{
  "message": "Invalid status"
}
```

**Error** (404 Not Found):
```json
{
  "message": "Lead not found"
}
```

**cURL Example**:
```bash
curl -X PUT http://localhost:5000/api/leads/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"status":"converted"}'
```

---

### 6. Delete Lead

**Endpoint**: `DELETE /api/leads/:id`

**Access**: Protected (Admin only)

**Description**: Delete a lead from the database

**URL Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | Integer | Yes | Lead ID |

**Response** (200 OK):
```json
{
  "message": "Lead deleted successfully"
}
```

**Error** (404 Not Found):
```json
{
  "message": "Lead not found"
}
```

**cURL Example**:
```bash
curl -X DELETE http://localhost:5000/api/leads/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 7. Get Statistics

**Endpoint**: `GET /api/stats`

**Access**: Protected (Admin only)

**Description**: Get lead statistics (total, converted, pending)

**Response** (200 OK):
```json
{
  "total": 10,
  "converted": 3,
  "pending": 7
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:5000/api/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 8. Health Check

**Endpoint**: `GET /`

**Access**: Public

**Description**: Check if API is running

**Response** (200 OK):
```json
{
  "message": "LeadFlow CRM API running successfully"
}
```

**cURL Example**:
```bash
curl http://localhost:5000/
```

---

## 📊 Response Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## ❌ Error Handling

### Common Error Responses

**Missing Token**:
```json
{
  "message": "No token provided"
}
```

**Invalid Token**:
```json
{
  "message": "Invalid or expired token"
}
```

**Invalid Credentials**:
```json
{
  "message": "Invalid credentials"
}
```

**Lead Not Found**:
```json
{
  "message": "Lead not found"
}
```

---

## 🔑 Request/Response Examples

### Complete Workflow Example

#### 1. Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@leadflow.com","password":"admin123"}'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

#### 2. Create Lead (Public)
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Alice Johnson",
    "email":"alice@example.com",
    "source":"Google Ads"
  }'
```

#### 3. Get All Leads
```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 4. Update Lead Status
```bash
curl -X PUT http://localhost:5000/api/leads/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"status":"converted"}'
```

#### 5. Delete Lead
```bash
curl -X DELETE http://localhost:5000/api/leads/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 🧪 Testing API with Postman

1. **Import Collection**:
   - Use examples above in Postman

2. **Set Variables**:
   - Create variable: `url` = `http://localhost:5000`
   - Create variable: `token` = Your JWT token

3. **Use in Requests**:
   - `{{url}}/api/leads`
   - `Authorization: Bearer {{token}}`

---

## 💡 Tips

1. **Save Token** - Copy token after login to use in subsequent requests
2. **Test Locally** - Use Postman or cURL before integrating with frontend
3. **Check Headers** - Ensure `Authorization` header is included for protected routes
4. **Content-Type** - Always use `Content-Type: application/json`
5. **Error Messages** - Check response body for detailed error information

---

**Last Updated**: May 8, 2024

