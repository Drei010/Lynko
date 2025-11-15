# 🗄️ Complete Database Configuration Summary

## 📋 What You Need to Know

The Lynko backend uses **PostgreSQL** to store conversations and messages. It's **optional** for development but **required** for production.

---

## ⚡ Installation (Choose Your OS)

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Ubuntu/Debian (What You're Using)
```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows
- Download from: https://www.postgresql.org/download/windows/
- Run installer, follow prompts

**After installing:** Move to "Setup Database" section below

---

## 🗂️ Setup Database

### 1. Create Database
```bash
# Ubuntu/Linux
sudo -u postgres createdb lynko_dev

# macOS
createdb lynko_dev

# Or connect and create manually
sudo -u postgres psql
CREATE DATABASE lynko_dev;
\q
```

### 2. Update `backend/.env`
```bash
# Simple method (recommended for development)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lynko_dev
DB_USER=postgres
DB_PASSWORD=postgres

# Or use connection string (recommended for production)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lynko_dev
```

### 3. Run Migrations
```bash
cd backend
npm run migrate
```

This creates all tables automatically.

### 4. Verify Connection
```bash
cd backend
npm run test:openai
```

Should show: ✓ Database connected successfully

---

## 🔐 Security (Optional but Recommended)

### Create a Dedicated User
```bash
sudo -u postgres psql

CREATE USER lynko_user WITH PASSWORD 'strong_password_here';
CREATE DATABASE lynko_prod OWNER lynko_user;
GRANT ALL PRIVILEGES ON DATABASE lynko_prod TO lynko_user;
\q
```

Then update `backend/.env`:
```bash
DATABASE_URL=postgresql://lynko_user:strong_password_here@localhost:5432/lynko_prod
```

---

## 📊 What Gets Created

Two tables are automatically created by `npm run migrate`:

### conversations
- Stores chat conversation sessions
- Fields: id, title, context, ai_model, created_at, updated_at

### messages
- Stores individual chat messages
- Fields: id, conversation_id, role (user/assistant), content, created_at

**Size:** Very small (< 10MB even with millions of messages)

---

## 🧪 Verify Everything Works

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Connect to database
sudo -u postgres psql -d lynko_dev

# List tables (should show 2)
\dt

# Count records
SELECT COUNT(*) FROM conversations;
SELECT COUNT(*) FROM messages;

# Exit
\q
```

---

## 🚀 Configuration for Different Environments

### Development (Local)
```bash
# backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lynko_dev
DB_USER=postgres
DB_PASSWORD=postgres
NODE_ENV=development
```

### Production (Supabase - Free Tier)
1. Sign up: https://supabase.com
2. Create project
3. Copy connection string
```bash
DATABASE_URL=postgresql://postgres:xxxxx@db.supabase.co:5432/postgres
NODE_ENV=production
```

### Production (Railway)
1. Sign up: https://railway.app
2. Create PostgreSQL service
3. Copy connection string
```bash
DATABASE_URL=postgresql://postgres:xxxxx@containers-us-west.railway.app:5432/railway
NODE_ENV=production
```

### Production (Render)
1. Sign up: https://render.com
2. Create PostgreSQL database
3. Copy external connection string
```bash
DATABASE_URL=postgresql://user:pass@dpg-xxxxx.render.com/database
NODE_ENV=production
```

---

## 📚 Related Documentation

| Document | Purpose |
|----------|---------|
| `DATABASE_QUICK_START.md` | Quick reference (2 min) |
| `DATABASE_SETUP.md` | Comprehensive guide |
| `POSTGRES_INSTALL.md` | Installation troubleshooting |
| `backend/README.md` | API documentation |

---

## ✅ Complete Checklist

- [ ] PostgreSQL installed
- [ ] PostgreSQL service running
- [ ] Database created (lynko_dev)
- [ ] `backend/.env` configured
- [ ] Migrations run (`npm run migrate`)
- [ ] Connection verified (`npm run test:openai`)
- [ ] Ready to start app (`./start.sh`)

---

## 🎯 Next Steps

1. **Install PostgreSQL** (see section above for your OS)
2. **Create database**: `sudo -u postgres createdb lynko_dev`
3. **Update `.env`** with database details
4. **Run migrations**: `cd backend && npm run migrate`
5. **Verify**: `cd backend && npm run test:openai`
6. **Start app**: `./start.sh`

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Permission denied on apt install | Use `sudo`: `sudo apt install postgresql` |
| PostgreSQL not running | Start it: `sudo systemctl start postgresql` |
| Connection refused | Check `.env` has correct host/port |
| Database doesn't exist | Create it: `sudo -u postgres createdb lynko_dev` |
| Authentication failed | Check password in `.env` |

---

## 💡 Key Points

✅ **Database is optional** for development (chatbot works without it)  
✅ **Database is required** for production  
✅ **Uses PostgreSQL** (not SQLite or MySQL)  
✅ **Two small tables** (conversations, messages)  
✅ **Auto-migration** on first run  
✅ **Production hosting** available (Supabase, Railway, Render free tiers)

---

**Status:** ✅ Ready to configure  
**Next:** Follow the installation instructions for your OS above  
**Help:** See `DATABASE_QUICK_START.md` for quick reference
