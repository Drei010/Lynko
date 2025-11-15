# 🗄️ Backend Database Configuration Guide

This guide explains how to set up and configure PostgreSQL for the Lynko backend.

## 📋 Overview

The Lynko backend uses **PostgreSQL** to store conversations and messages. The database configuration is **optional** for development - the chatbot works without it - but is recommended for production.

**Database Size:** Very small (just 2 tables)  
**Required:** For production deployment  
**Optional:** For development (chatbot works without it)

---

## 🚀 Quick Setup (5 minutes)

### 1. Install PostgreSQL

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Run the installer and follow prompts

### 2. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE lynko_dev;

# Create user (optional, for security)
CREATE USER lynko_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE lynko_dev TO lynko_user;

# Exit
\q
```

### 3. Configure Environment

Edit `backend/.env`:

```bash
# Option A: Individual settings
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lynko_dev
DB_USER=postgres
DB_PASSWORD=your_password

# Option B: Connection string (takes precedence)
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/lynko_dev
```

### 4. Run Migrations

```bash
cd backend
npm run migrate
```

### 5. Verify Connection

```bash
cd backend
npm run test:openai  # Also tests database
```

---

## 📝 Configuration Methods

### Method 1: Environment Variables (Recommended for Development)

Edit `backend/.env`:

```bash
# PostgreSQL Settings
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lynko_dev
DB_USER=postgres
DB_PASSWORD=your_password
NODE_ENV=development
```

**Pros:**
- Easy to understand
- Clear separation of config
- Works well with local development

**Cons:**
- Less secure for passwords in files
- Not ideal for production

### Method 2: Connection String (Recommended for Production)

Edit `backend/.env`:

```bash
# PostgreSQL Connection String
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
NODE_ENV=production
```

**Pros:**
- Single line configuration
- Works with hosted services (Heroku, Railway, Render)
- More secure with env var injection
- Standard format

**Cons:**
- Less transparent about settings

### Method 3: System Environment Variables

Instead of editing `.env`, set system variables:

```bash
# Export variables
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=lynko_dev
export DB_USER=postgres
export DB_PASSWORD=secure_password

# Then start backend
npm start
```

---

## 🔧 Connection String Format

### Local Development
```
postgresql://postgres:password@localhost:5432/lynko_dev
```

### With Custom User
```
postgresql://lynko_user:secure_password@localhost:5432/lynko_dev
```

### Remote Server
```
postgresql://user:password@db.example.com:5432/lynko_prod
```

### Heroku
```
postgresql://user:password@ec2-xxx.compute-1.amazonaws.com:5432/database_name
```

### Supabase
```
postgresql://postgres:password@db.supabase.co:5432/postgres
```

---

## 🗂️ Database Schema

The backend automatically creates these tables:

### Conversations Table
```sql
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    context TEXT,
    ai_model VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Messages Table
```sql
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Tables:** 2 (conversations, messages)  
**Rows (typical):** Under 1000  
**Storage:** < 10MB  

---

## 🛠️ Migration Scripts

### Run Migrations

```bash
cd backend
npm run migrate
```

This creates all tables, indexes, and constraints.

### Manual Migration

If npm script doesn't work:

```bash
# Connect to database
psql postgresql://username:password@localhost:5432/lynko_dev

# Paste the schema from backend/database/schema.sql
\i backend/database/schema.sql

# Verify tables were created
\dt

# Exit
\q
```

### Check Current State

```bash
psql postgresql://username:password@localhost:5432/lynko_dev

# List all tables
\dt

# Describe conversations table
\d conversations

# Describe messages table
\d messages

# Count records
SELECT COUNT(*) FROM conversations;
SELECT COUNT(*) FROM messages;
```

---

## 🔐 Security Best Practices

### 1. Use Strong Passwords
```bash
# Generate secure password
openssl rand -base64 32
```

### 2. Create Dedicated User
```sql
-- Instead of using postgres user
CREATE USER lynko_user WITH PASSWORD 'strong_password_here';
CREATE DATABASE lynko_prod OWNER lynko_user;
GRANT ALL PRIVILEGES ON DATABASE lynko_prod TO lynko_user;
```

### 3. Restrict Permissions
```sql
-- Don't give unnecessary privileges
REVOKE ALL PRIVILEGES ON DATABASE lynko_prod FROM PUBLIC;
GRANT CONNECT ON DATABASE lynko_prod TO lynko_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO lynko_user;
```

### 4. Use Connection String with Env Vars
```bash
# In production, use environment variable injection
export DATABASE_URL=postgresql://user:pass@host:5432/db
npm start
```

### 5. Never Commit Secrets
```bash
# Make sure .env is in .gitignore
echo ".env" >> .gitignore
git rm --cached backend/.env
```

### 6. Use SSL in Production
```bash
# Connection string with SSL
postgresql://user:pass@host:5432/db?sslmode=require
```

---

## 📊 Hosted Database Services

### Supabase (Free Tier - Recommended)
1. Sign up: https://supabase.com
2. Create project
3. Get connection string from settings
4. Add to `backend/.env`:
   ```bash
   DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
   ```

### Railway
1. Sign up: https://railway.app
2. Create PostgreSQL service
3. Copy connection string
4. Set as environment variable

### Render
1. Sign up: https://render.com
2. Create PostgreSQL database
3. Copy external connection string
4. Use in `backend/.env`

### Amazon RDS
1. Create RDS PostgreSQL instance
2. Get endpoint and credentials
3. Format as connection string
4. Set in environment variables

### Google Cloud SQL
1. Create PostgreSQL instance
2. Create database and user
3. Get connection string
4. Set in environment variables

---

## 🧪 Testing Database Connection

### Test with npm script
```bash
cd backend
npm run test:openai
```

### Test with psql
```bash
psql postgresql://user:password@localhost:5432/lynko_dev -c "SELECT 1;"
```

### Test with node
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://user:password@localhost:5432/lynko_dev'
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error(err);
  else console.log('✓ Connected:', res.rows[0]);
  pool.end();
});
```

---

## 🔍 Troubleshooting

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432

Solutions:
1. Start PostgreSQL: brew services start postgresql@15
2. Check if running: psql --version
3. Check port: netstat -tuln | grep 5432
```

### Authentication Failed
```
Error: password authentication failed for user "postgres"

Solutions:
1. Check password in .env matches PostgreSQL user
2. Reset password: ALTER USER postgres PASSWORD 'new_password';
3. Check username matches (postgres vs lynko_user, etc.)
```

### Database Does Not Exist
```
Error: database "lynko_dev" does not exist

Solutions:
1. Create database: CREATE DATABASE lynko_dev;
2. Run migrations: npm run migrate
3. Verify: psql postgres -l | grep lynko_dev
```

### SSL/TLS Certificate Error
```
Error: certificate verify failed

Solutions:
1. Add to connection string: ?sslmode=disable
2. Or: ?sslmode=require with proper certs
3. Check if using remote database without proper SSL setup
```

### Connection Pool Exhausted
```
Error: sorry, too many connections

Solutions:
1. Increase max connections: ALTER SYSTEM SET max_connections = 200;
2. Check for connection leaks in code
3. Restart database: sudo systemctl restart postgresql
```

### Timeout Waiting for Connection
```
Error: socket timeout

Solutions:
1. Check network connectivity
2. Increase timeout: connectionTimeoutMillis: 5000
3. Verify database is responding: ping hostname
4. Check firewall rules
```

---

## 📈 Performance Tips

### 1. Use Indexes
Already configured in schema for:
- conversations.created_at
- messages.conversation_id
- messages.created_at

### 2. Connection Pooling
Already configured:
```javascript
max: 20,                    // Max clients
idleTimeoutMillis: 30000,   // Idle timeout
connectionTimeoutMillis: 2000 // Connection timeout
```

### 3. Regular Maintenance
```bash
# Analyze tables (PostgreSQL optimization)
psql -U postgres -d lynko_dev -c "ANALYZE;"

# Vacuum (cleanup)
psql -U postgres -d lynko_dev -c "VACUUM;"

# Schedule regularly (weekly)
```

### 4. Monitor Usage
```bash
# See current connections
SELECT pid, usename, application_name FROM pg_stat_activity;

# See table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🚀 Production Checklist

- [ ] Use dedicated database user (not postgres)
- [ ] Use strong password (32+ characters)
- [ ] Enable SSL/TLS for remote connections
- [ ] Set DATABASE_URL as environment variable
- [ ] Never commit .env to git
- [ ] Backup database regularly
- [ ] Monitor connection pool usage
- [ ] Use connection string format (not individual vars)
- [ ] Test connection before deployment
- [ ] Set up automated backups

---

## 📞 Common Configuration Examples

### Local Development
```bash
# backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lynko_dev
DB_USER=postgres
DB_PASSWORD=postgres
NODE_ENV=development
```

### Production with Supabase
```bash
# backend/.env
DATABASE_URL=postgresql://postgres:xxx@db.supabase.co:5432/postgres
NODE_ENV=production
```

### Production with Railway
```bash
# backend/.env
DATABASE_URL=postgresql://postgres:xxx@containers-us-west-00.railway.app:5432/railway
NODE_ENV=production
```

### Docker Compose
```bash
# backend/.env
DATABASE_URL=postgresql://lynko_user:password@db:5432/lynko_prod
NODE_ENV=production
```

---

## ✅ Next Steps

1. **Install PostgreSQL** on your system
2. **Create database**: `createdb lynko_dev`
3. **Update `.env`** with connection details
4. **Run migrations**: `npm run migrate`
5. **Test connection**: `npm run test:openai`
6. **Start backend**: `npm start`

---

**Status:** ✅ Production Ready  
**Last Updated:** November 2025  
**Support:** Check backend/README.md for API docs
