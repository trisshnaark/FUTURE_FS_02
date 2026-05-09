# 🔐 Environment Variables Template

Copy this file and create `.env` files in backend and frontend folders for production.

## Backend Environment Variables

Create `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MySQL Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password_here
MYSQL_DATABASE=crm

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# API Configuration
API_VERSION=v1
API_BASE_URL=http://localhost:5000
```

## Frontend Environment Variables

Create `frontend/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=30000

# App Configuration
VITE_APP_NAME=LeadFlow CRM
VITE_APP_VERSION=1.0.0

# Environment
VITE_ENV=development
```

## Frontend Environment Variables for Production

Create `frontend/.env.production`:

```env
# API Configuration (Production)
VITE_API_URL=https://api.leadflow.yourdomain.com
VITE_API_TIMEOUT=30000

# App Configuration
VITE_APP_NAME=LeadFlow CRM
VITE_APP_VERSION=1.0.0

# Environment
VITE_ENV=production
```

## How to Use

### Backend Setup

1. Create file: `backend/.env`
2. Copy environment variables
3. Replace placeholder values
4. Restart backend: `npm start`

### Frontend Setup

1. Create file: `frontend/.env`
2. Copy environment variables
3. Restart frontend: `npm run dev`

## Important Notes

### Security
⚠️ **NEVER** commit `.env` files to git  
⚠️ Add `.env*` to `.gitignore`  
⚠️ Use strong JWT secret in production  
⚠️ Use different passwords for each environment  

### MySQL Password
```
Example: MySecurePassword123!@#
- At least 12 characters
- Mix of uppercase, lowercase, numbers, special chars
- Not easily guessable
```

### JWT Secret
```
Example: c9b8e7d6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0
- At least 32 characters
- Random string
- Never share or expose
```

## Production Deployment

### Environment: Heroku

Set environment variables in Heroku dashboard:

```bash
heroku config:set MYSQL_HOST=your-rds-host.amazonaws.com
heroku config:set MYSQL_USER=admin
heroku config:set MYSQL_PASSWORD=your_secure_password
heroku config:set JWT_SECRET=your_production_jwt_secret
```

### Environment: AWS Lambda

Use AWS Secrets Manager:

```bash
aws secretsmanager create-secret \
  --name leadflow/prod \
  --secret-string file://secrets.json
```

### Environment: Docker

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MYSQL_HOST=mysql
      - MYSQL_USER=root
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mysql
  
  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_PASSWORD}
      - MYSQL_DATABASE=crm
    volumes:
      - ./database.sql:/docker-entrypoint-initdb.d/init.sql
```

## Verifying Environment Variables

### Backend

```javascript
// In backend/index.js
const mysqlHost = process.env.MYSQL_HOST || 'localhost';
const mysqlUser = process.env.MYSQL_USER || 'root';
const mysqlPass = process.env.MYSQL_PASSWORD || 'YOUR_PASSWORD';
const jwtSecret = process.env.JWT_SECRET || 'default-secret';
```

### Frontend

```javascript
// In frontend/src/components/API.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

## Environment Checklist

### Development
- [ ] `.env` created locally
- [ ] MySQL credentials correct
- [ ] JWT secret set
- [ ] Frontend API URL: `http://localhost:5000`
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173

### Staging
- [ ] Environment variables configured
- [ ] Database backup enabled
- [ ] API URL updated
- [ ] JWT secret changed
- [ ] CORS configured
- [ ] SSL certificate installed

### Production
- [ ] All environment variables set
- [ ] Strong JWT secret
- [ ] Secure database password
- [ ] HTTPS enabled
- [ ] CORS restricted
- [ ] Rate limiting enabled
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Security headers set
- [ ] Regular security audits

## Example .env Files

### Development Backend (.env)

```env
PORT=5000
NODE_ENV=development

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root123
MYSQL_DATABASE=crm

JWT_SECRET=dev-secret-key-change-me
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:5173

API_VERSION=v1
API_BASE_URL=http://localhost:5000
```

### Production Backend (.env.production)

```env
PORT=5000
NODE_ENV=production

MYSQL_HOST=your-rds-instance.amazonaws.com
MYSQL_PORT=3306
MYSQL_USER=admin
MYSQL_PASSWORD=SecureP@ssw0rd123!@#
MYSQL_DATABASE=crm_prod

JWT_SECRET=c9b8e7d6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0
JWT_EXPIRE=7d

CORS_ORIGIN=https://leadflow.yourdomain.com

API_VERSION=v1
API_BASE_URL=https://api.leadflow.yourdomain.com
```

### Development Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=30000

VITE_APP_NAME=LeadFlow CRM
VITE_APP_VERSION=1.0.0

VITE_ENV=development
```

### Production Frontend (.env.production)

```env
VITE_API_URL=https://api.leadflow.yourdomain.com
VITE_API_TIMEOUT=30000

VITE_APP_NAME=LeadFlow CRM
VITE_APP_VERSION=1.0.0

VITE_ENV=production
```

## .gitignore Template

Add to your `.gitignore`:

```
# Environment variables
.env
.env.local
.env.*.local
.env.production

# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build
dist/
build/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/
```

## Security Best Practices

1. **Never commit .env files**
   - Add to .gitignore
   - Use secret management tools

2. **Rotate secrets regularly**
   - Change JWT secret quarterly
   - Update database password
   - Audit access logs

3. **Use strong passwords**
   - At least 12 characters
   - Mix of character types
   - No dictionary words

4. **Limit access**
   - Restrict database access
   - Use firewall rules
   - Encrypt connections

5. **Monitor usage**
   - Enable logging
   - Set up alerts
   - Regular audits

---

For more details, see:
- Backend setup: `SETUP_GUIDE.md`
- Configuration: `README.md`
- API docs: `API_DOCUMENTATION.md`

