# 🗄️ Database Setup Quick Reference

## ⚡ Fastest Way (5 minutes)

### 1. Install PostgreSQL
```bash
# macOS
brew install postgresql@15 && brew services start postgresql@15

# Ubuntu
sudo apt install postgresql && sudo systemctl start postgresql
```

### 2. Create Database
```bash
createdb lynko_dev
```

### 3. Update backend/.env
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lynko_dev
DB_USER=postgres
DB_PASSWORD=postgres
```

### 4. Run Migrations
```bash
cd backend && npm run migrate
```

### 5. Test
```bash
cd backend && npm run test:openai
```

**Done!** ✅

---

## 🔄 Configuration Options

### Option A: Individual Settings (Simple)
```bash
# backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lynko_dev
DB_USER=postgres
DB_PASSWORD=your_password
```

### Option B: Connection String (Advanced)
```bash
# backend/.env
DATABASE_URL=postgresql://postgres:password@localhost:5432/lynko_dev
```

---

## 🗂️ What Gets Created

| Table | Purpose |
|-------|---------|
| `conversations` | Store chat conversations |
| `messages` | Store individual messages |

**Size:** Tiny (< 10MB for millions of messages)  
**Auto-created:** By `npm run migrate`  

---

## 🧪 Verify Setup

```bash
# Check database exists
psql postgres -c "\l" | grep lynko

# Connect to database
psql postgresql://postgres:password@localhost:5432/lynko_dev

# List tables
\dt

# Count messages
SELECT COUNT(*) FROM messages;

# Exit
\q
```

---

## 📊 For Hosted Services

### Supabase
```bash
DATABASE_URL=postgresql://postgres:xxxxx@db.supabase.co:5432/postgres
```

### Railway
```bash
DATABASE_URL=postgresql://postgres:xxxxx@containers-us-west.railway.app:5432/railway
```

### Render
```bash
DATABASE_URL=postgresql://user:pass@dpg-xxxxx.render.com/database
```

---

## 🆘 Troubleshooting

| Error | Fix |
|-------|-----|
| Connection refused | Start PostgreSQL: `brew services start postgresql@15` |
| Database doesn't exist | Run: `createdb lynko_dev` |
| Auth failed | Check password in `.env` matches |
| Can't connect | Check `.env` has correct host/port |

---

## 📞 Common Commands

```bash
# Start PostgreSQL
brew services start postgresql@15

# Stop PostgreSQL
brew services stop postgresql@15

# Connect to database
psql postgresql://user:pass@localhost:5432/lynko_dev

# Run migrations
cd backend && npm run migrate

# Reset database
dropdb lynko_dev && createdb lynko_dev && npm run migrate
```

---

**Done!** Now your database is ready. Run `./start.sh` to start the app.
