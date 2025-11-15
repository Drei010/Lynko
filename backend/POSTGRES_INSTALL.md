# 🔧 PostgreSQL Installation Guide

## The Error You Got

```
E: Could not open lock file /var/lib/dpkg/lock-frontend
E: Unable to acquire the dpkg frontend lock
```

**Cause:** Installing system packages requires administrator (root) privileges

**Solution:** Use `sudo` (Super User DO)

---

## ✅ Correct Installation Command

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
```

**Breaking it down:**
- `sudo` - Run as administrator
- `apt update` - Update package list
- `apt install` - Install packages
- `-y` - Automatically answer "yes" to prompts
- `postgresql` - The database server
- `postgresql-contrib` - Extra tools and extensions

---

## 📋 Step-by-Step Installation

### 1. Update Package List
```bash
sudo apt update
```

### 2. Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
```

**Prompts:**
- If asked for password, enter your system password
- If asked to continue, answer `y`

### 3. Verify Installation
```bash
psql --version
```

Should show: `psql (PostgreSQL) 12.x` or higher

### 4. Start PostgreSQL Service
```bash
sudo systemctl start postgresql
```

### 5. Enable Auto-Start
```bash
sudo systemctl enable postgresql
```

### 6. Check Status
```bash
sudo systemctl status postgresql
```

Should show: **active (running)** in green

---

## 🗄️ Create Your Database

### Switch to postgres User
```bash
sudo -u postgres psql
```

### Create Database
```sql
CREATE DATABASE lynko_dev;
\q
```

### Or as One Command
```bash
sudo -u postgres createdb lynko_dev
```

---

## 🔐 Create Database User (Optional but Recommended)

```bash
# Connect as postgres user
sudo -u postgres psql

# Create user
CREATE USER lynko_user WITH PASSWORD 'secure_password';

# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE lynko_dev TO lynko_user;

# Exit
\q
```

---

## ✨ Quick Commands Reference

| Task | Command |
|------|---------|
| Install | `sudo apt install -y postgresql postgresql-contrib` |
| Start | `sudo systemctl start postgresql` |
| Stop | `sudo systemctl stop postgresql` |
| Status | `sudo systemctl status postgresql` |
| Restart | `sudo systemctl restart postgresql` |
| Create DB | `sudo -u postgres createdb lynko_dev` |
| Connect | `sudo -u postgres psql` |
| Remove | `sudo apt remove postgresql postgresql-contrib` |

---

## 🆘 Troubleshooting

### "Command not found: psql"
```bash
# Make sure PostgreSQL is installed
which psql

# If not found, reinstall
sudo apt install postgresql-client
```

### "Permission denied" on service commands
```bash
# Always use sudo for system service commands
sudo systemctl start postgresql
sudo systemctl status postgresql
```

### Can't Connect to Database
```bash
# Verify PostgreSQL is running
sudo systemctl status postgresql

# If stopped, start it
sudo systemctl start postgresql

# Check if listening on port 5432
sudo netstat -tuln | grep 5432
```

### Forgot postgres Password
```bash
# Reset password (as root)
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'newpassword';"
```

---

## 📝 Update backend/.env

After installation, update `backend/.env`:

```bash
# Using default postgres user
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lynko_dev
DB_USER=postgres
DB_PASSWORD=postgres  # Or your password if you changed it

# Or using connection string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lynko_dev
```

---

## 🚀 Next Steps

1. **Install PostgreSQL**: `sudo apt install -y postgresql postgresql-contrib`
2. **Create database**: `sudo -u postgres createdb lynko_dev`
3. **Update `.env`** with database details
4. **Run migrations**: `cd backend && npm run migrate`
5. **Start app**: `./start.sh`

---

## 💡 Why sudo?

In Linux/Ubuntu, installing system packages requires root (administrator) privileges. `sudo` temporarily elevates your permissions to install software.

**Note:** Only use `sudo` for system operations, not regular commands.

---

**Status:** ✅ Ready to install
**Next:** Run the install command above
