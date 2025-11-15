# 🗄️ Backend Database Configuration - Complete Guide

## 📌 Quick Answer to Your Permission Error

### The Error You Got
```
E: Could not open lock file /var/lib/dpkg/lock-frontend
E: Unable to acquire the dpkg frontend lock
are you root?
```

### The Fix
**Add `sudo` to the beginning of the command:**

```bash
# ❌ Wrong (missing sudo)
apt install postgresql postgresql-contrib

# ✅ Correct (with sudo)
sudo apt install -y postgresql postgresql-contrib
```

**Why?** Installing system packages requires administrator privileges. `sudo` elevates your permissions temporarily.

---

## 🚀 Complete PostgreSQL Setup (Ubuntu/Linux)

### Step 1: Update Package List
```bash
sudo apt update
```

### Step 2: Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
```

- `sudo` = Run with admin privileges
- `-y` = Automatically answer "yes" to prompts
- `postgresql` = Database server
- `postgresql-contrib` = Extra tools

### Step 3: Start PostgreSQL Service
```bash
sudo systemctl start postgresql
```

### Step 4: Enable Auto-Start (Optional)
```bash
sudo systemctl enable postgresql
```

### Step 5: Verify Installation
```bash
psql --version
```

Should display: `psql (PostgreSQL) 16.x` or similar

---

## 🗂️ Create Your Database

### Quick Method (Recommended)
```bash
sudo -u postgres createdb lynko_dev
```

### Manual Method (If Above Doesn't Work)
```bash
# Connect to PostgreSQL as admin
sudo -u postgres psql

# Inside psql, create database
CREATE DATABASE lynko_dev;

# Exit psql
\q
```

---

## ⚙️ Configure Your Backend

### Edit `backend/.env`
Open this file in VS Code and update it:

```bash
# PostgreSQL Settings
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lynko_dev
DB_USER=postgres
DB_PASSWORD=postgres
NODE_ENV=development
```

**Or use connection string** (more secure for production):
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lynko_dev
```

---

## 🔒 Security Setup (Optional but Recommended)

### Create Dedicated Database User
```bash
# Connect as postgres user
sudo -u postgres psql

# Create new user
CREATE USER lynko_user WITH PASSWORD 'secure_password_123';

# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE lynko_dev TO lynko_user;

# Exit
\q
```

### Update `backend/.env`
```bash
DATABASE_URL=postgresql://lynko_user:secure_password_123@localhost:5432/lynko_dev
```

---

## 🏃 Run Migrations

```bash
cd backend
npm run migrate
```

This creates all tables automatically:
- `conversations` table
- `messages` table

---

## ✅ Verify Everything Works

### Test 1: Check PostgreSQL is Running
```bash
sudo systemctl status postgresql
```

Should show: **active (running)** in green

### Test 2: Connect to Database
```bash
sudo -u postgres psql -d lynko_dev
```

### Test 3: Check Tables Were Created
```bash
# Inside psql
\dt
```

Should show:
```
Schema | Name              | Type  | Owner
-------+-------------------+-------+----------
public | conversations     | table | postgres
public | messages          | table | postgres
```

### Test 4: Exit psql
```sql
\q
```

### Test 5: Test Backend Connection
```bash
cd backend
npm run test:openai
```

Should show: ✓ Database connected successfully

---

## 🌍 Production Alternatives (No Installation Needed)

If you don't want to install PostgreSQL locally, use these free hosted services:

### Supabase (Recommended - Free Tier)
1. Go to: https://supabase.com
2. Click "Start your project"
3. Create account
4. Get connection string from "Settings > Database"
5. Add to `backend/.env`:
```bash
DATABASE_URL=postgresql://postgres:xxxxx@db.supabase.co:5432/postgres
```

### Railway
1. Go to: https://railway.app
2. Sign up
3. Create PostgreSQL service
4. Copy connection string
5. Add to `backend/.env`:
```bash
DATABASE_URL=postgresql://postgres:xxxxx@containers-us-west.railway.app/railway
```

### Render
1. Go to: https://render.com
2. Sign up
3. Create PostgreSQL database
4. Copy external URL
5. Add to `backend/.env`:
```bash
DATABASE_URL=postgresql://user:pass@dpg-xxxxx.render.com/database
```

---

## 🆘 Troubleshooting

### Still Getting Permission Error?
```bash
# Make sure you're using sudo
sudo apt install -y postgresql postgresql-contrib

# If still issues, try updating first
sudo apt update
sudo apt install -y postgresql postgresql-contrib
```

### PostgreSQL Not Running?
```bash
# Check status
sudo systemctl status postgresql

# If inactive, start it
sudo systemctl start postgresql

# Make it auto-start
sudo systemctl enable postgresql
```

### Can't Connect to Database?
```bash
# Check .env has correct credentials
cat backend/.env | grep DB_

# Test connection with psql
psql postgresql://postgres:postgres@localhost:5432/lynko_dev

# If fails, check port is listening
sudo netstat -tuln | grep 5432
```

### Database Doesn't Exist?
```bash
# Create it
sudo -u postgres createdb lynko_dev

# Verify it exists
sudo -u postgres psql -l | grep lynko_dev
```

### Authentication Failed?
```bash
# Reset postgres password
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

# Then update backend/.env with the new password
```

---

## 📊 What Gets Created

### Tables
| Table | Purpose |
|-------|---------|
| `conversations` | Store chat conversation sessions |
| `messages` | Store individual messages within conversations |

### Fields

**conversations table:**
- `id` - Unique identifier
- `title` - Conversation title
- `context` - System prompt/context
- `ai_model` - Model used (gpt-3.5-turbo, etc)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

**messages table:**
- `id` - Unique identifier
- `conversation_id` - Links to conversation
- `role` - Either "user" or "assistant"
- `content` - Message text
- `created_at` - Creation timestamp

### Size
- Very small: < 10MB even with millions of messages
- Auto-managed: indexes and cleanup handled automatically

---

## ✨ Key Commands Reference

| Task | Command |
|------|---------|
| Install | `sudo apt install -y postgresql postgresql-contrib` |
| Start | `sudo systemctl start postgresql` |
| Stop | `sudo systemctl stop postgresql` |
| Status | `sudo systemctl status postgresql` |
| Create DB | `sudo -u postgres createdb lynko_dev` |
| Connect | `sudo -u postgres psql -d lynko_dev` |
| Migrations | `cd backend && npm run migrate` |
| Test API | `cd backend && npm run test:openai` |

---

## 📚 Documentation Map

| Document | Purpose |
|----------|---------|
| `DATABASE_QUICK_START.md` | 2-minute quick reference |
| `DATABASE_SETUP.md` | Comprehensive detailed guide |
| `DATABASE_CONFIG_GUIDE.md` | Environment-specific configs |
| `POSTGRES_INSTALL.md` | Installation troubleshooting |
| `backend/README.md` | API documentation |

---

## ✅ Complete Setup Checklist

- [ ] Run: `sudo apt update`
- [ ] Run: `sudo apt install -y postgresql postgresql-contrib`
- [ ] Create DB: `sudo -u postgres createdb lynko_dev`
- [ ] Update `backend/.env` with connection details
- [ ] Run: `cd backend && npm run migrate`
- [ ] Test: `cd backend && npm run test:openai`
- [ ] Start: `./start.sh`

---

## 🎯 Next Steps

1. **Install PostgreSQL** (see Step 1-5 above)
2. **Create database** (see Create Database section)
3. **Configure backend** (see Configure Your Backend section)
4. **Run migrations** (see Run Migrations section)
5. **Verify** (see Verify Everything Works section)
6. **Start app**: `./start.sh`

---

## 💡 Remember

- **Always use `sudo`** for system package installation
- **Database is optional** for development (chatbot works without it)
- **Database is required** for production
- **Use hosted services** if you don't want local installation
- **Check `.env`** if you get connection errors

---

**Status:** ✅ Ready to follow these steps  
**Last Updated:** November 15, 2025  
**Next:** Follow the installation steps above
