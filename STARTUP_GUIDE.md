# 📖 Lynko Quickstart Guide - Summary

## ⚡ TL;DR

Start everything with **one command**:

```bash
./start.sh
```

That's it. Frontend runs on http://localhost:3000, backend on http://localhost:5000.

---

## 🎯 What You Get

### Automatic Setup
The `start.sh` script handles everything:

```
✅ Checks Node.js & npm
✅ Creates .env files (if missing)
✅ Installs dependencies (if needed)
✅ Starts backend (port 5000)
✅ Starts frontend (port 3000)
✅ Runs health checks
✅ Shows you the dashboard
```

### Before First Run
You only need to set one thing:

1. **Get OpenAI API key**: https://platform.openai.com/api-keys
2. **Edit `backend/.env`**:
   ```bash
   OPENAI_API_KEY=sk-proj-your-actual-key
   ```

That's it. Database is optional.

---

## 🚀 Quick Commands

```bash
# Start everything
./start.sh

# With custom ports
./start.sh 8000 8001

# Help / Available commands
./help.sh

# Backend only
cd backend && npm start

# Frontend only
npm run dev

# Test OpenAI
cd backend && npm run test:openai
```

---

## 🔗 Access Points

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:5000 |
| **Health Check** | http://localhost:5000/health |

---

## 📝 Project Files

```
Lynko/
├── start.sh              ← 🎯 Run this!
├── help.sh              ← Show all commands
├── QUICKSTART.md        ← Detailed setup
├── README.md            ← Project overview
├── PRODUCTION_DEPLOYMENT.md  ← Deploy to production
│
├── src/                 ← Frontend React code
├── backend/             ← Backend Express API
│   ├── server.js        ← Entry point
│   ├── .env             ← Your config (created automatically)
│   ├── env.example      ← Template for .env
│   └── routes/          ← API endpoints
│
└── package.json         ← Frontend dependencies
   & backend/package.json ← Backend dependencies
```

---

## 🔧 First Time Setup Checklist

- [ ] Install Node.js 18+ from https://nodejs.org/
- [ ] Get OpenAI API key from https://platform.openai.com/api-keys
- [ ] Clone the repo: `git clone https://github.com/Drei010/Lynko.git && cd Lynko`
- [ ] Run: `./start.sh`
- [ ] Open browser: http://localhost:3000
- [ ] Done! ✅

---

## 🧪 Testing

### Test Backend Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Lynko Backend is running",
  "environment": "development"
}
```

### Test Chat API
```bash
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!"}'
```

### Test OpenAI Connection
```bash
cd backend && npm run test:openai
```

---

## 🛑 Stopping Services

```bash
# Press Ctrl+C in the terminal running start.sh
```

Or in another terminal:
```bash
pkill -f "node"
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **QUICKSTART.md** | Detailed step-by-step setup (this file) |
| **README.md** | Project overview and features |
| **backend/README.md** | Backend API documentation |
| **backend/CHATGPT_SETUP.md** | OpenAI integration details |
| **PRODUCTION_DEPLOYMENT.md** | How to deploy to production |

---

## ❓ Troubleshooting

### Port Already in Use
```bash
# Use different ports
./start.sh 8000 8001
```

### Missing Dependencies
```bash
# Reinstall everything
rm -rf node_modules backend/node_modules
./start.sh
```

### OpenAI API Errors
```bash
# 1. Check your API key is correct
nano backend/.env

# 2. Test the connection
cd backend && npm run test:openai

# 3. Verify you have API credits
# https://platform.openai.com/account/billing/overview
```

### Database Issues
Database is **optional** for development. The chatbot works without it. If you get DB errors, either:
- Set up PostgreSQL: `createdb lynko_dev && cd backend && npm run migrate`
- Or ignore them (chatbot still works)

---

## 🎓 Learning Path

1. **Run the app**: `./start.sh`
2. **Explore the UI**: Visit http://localhost:3000
3. **Test the API**: Try the curl commands above
4. **Read the code**: Look at `src/App.tsx` and `backend/server.js`
5. **Modify a feature**: Try changing something and see the hot reload
6. **Deploy it**: Follow `PRODUCTION_DEPLOYMENT.md` when ready

---

## 🚀 Next Steps

- **Development**: Edit code and watch hot reload work
- **Backend**: Add API endpoints in `backend/routes/`
- **Frontend**: Add pages in `src/pages/`
- **Database**: Set up PostgreSQL for persistence (optional)
- **Production**: Read `PRODUCTION_DEPLOYMENT.md` to deploy

---

## 💡 Tips

- **Logs**: Check `/tmp/lynko-backend.log` and `/tmp/lynko-frontend.log`
- **Hot Reload**: Frontend automatically reloads on changes
- **API Proxy**: During development, `/api` proxies to backend automatically
- **Environment**: `.env.development` is for dev, `.env.production` for prod
- **Help**: Run `./help.sh` anytime to see all commands

---

## ✅ You're Ready!

```bash
./start.sh
```

Open http://localhost:3000 and start building! 🎉

---

**Questions?** Check the detailed docs in the repo or see the links above.
