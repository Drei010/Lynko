# 🚀 Quickstart Guide

Get Lynko running locally in seconds!

## Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **OpenAI API Key** ([Get here](https://platform.openai.com/api-keys))

**That's it!** No database needed. PostgreSQL is optional if you want to store conversation history.

## ⚡ Quick Start (One Command)

```bash
./start.sh
```

That's it! Both frontend and backend will start automatically.

### Output
```
✓ Node.js: v18.19.0
✓ npm: 10.2.3
...
🚀 Lynko is Running!

Frontend URL:  http://localhost:3000
Backend URL:   http://localhost:5000
API URL:       http://localhost:5000/api

Press Ctrl+C to stop all services
```

## 🎯 What the Script Does

The `start.sh` script automatically:

1. ✅ Checks Node.js and npm installation
2. ✅ Creates `.env` file if missing (from `env.example`)
3. ✅ Installs dependencies if needed
4. ✅ Creates `.env.development` for frontend
5. ✅ Starts backend on port 5000 (chatbot ready WITHOUT database!)
6. ✅ Starts frontend on port 3000
7. ✅ Runs health checks
8. ✅ Opens a nice dashboard with links

## 📝 First Time Setup

### 1. Set Up Backend Environment (Just OpenAI!)

The script automatically creates `.env` from `env.example`, but you need to add your OpenAI key:

```bash
nano backend/.env
```

**Required field only:**
```bash
# Your OpenAI API key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-proj-...
```

**That's all you need!** The chatbot is ready to use.

### 2. Optional: Set Up Database for Conversation History

If you want to store conversation history, set up PostgreSQL:

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb lynko_dev

# Add to backend/.env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lynko_dev

# Run migrations
cd backend && npm run migrate
# Exit
\q
```

### 3. Run Migrations

The backend will automatically set up tables on first run, but you can manually run:

```bash
cd backend
npm run migrate
```

### 4. Test OpenAI Connection

```bash
cd backend
npm run test:openai
```

Should output:
```
✓ OpenAI connection successful
✓ Model: gpt-3.5-turbo
```

## 🎮 Custom Ports

Want to use different ports?

```bash
# Use port 8000 for backend, 8001 for frontend
./start.sh 8000 8001
```

Then access:
- Frontend: http://localhost:8001
- Backend: http://localhost:8000

## 🔍 Checking Logs

While the app is running, in another terminal:

```bash
# Backend logs
tail -f /tmp/lynko-backend.log

# Frontend logs
tail -f /tmp/lynko-frontend.log
```

## 🧪 Testing the API

Once running, test the API in a new terminal:

```bash
# Health check
curl http://localhost:5000/health

# Chat with the bot
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello! How are you?"}'

# Expected response
# {"response": "I'm doing well! How can I help you?", "success": true}
```

## 🌐 Frontend Usage

1. Open http://localhost:3000 in your browser
2. You'll see the Lynko landing page
3. Click on a page to navigate
4. Send messages to the chatbot
5. Watch the API responses in real-time

## 🛑 Stopping the Services

```bash
# Press Ctrl+C in the terminal running ./start.sh
# All services will stop gracefully
```

Or in another terminal:

```bash
# Kill all Node processes
pkill -f "node|npm"
```

## 📂 Project Structure

```
Lynko/
├── start.sh                 # ← Run this!
├── src/                     # Frontend React code
├── backend/                 # Backend Express server
│   ├── server.js           # Entry point
│   ├── .env                # Your local config (created auto)
│   ├── env.example         # Template
│   └── routes/             # API endpoints
├── package.json            # Frontend dependencies
└── backend/package.json    # Backend dependencies
```

## ⚙️ Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

### Frontend (.env.development)
- `VITE_API_URL` - Backend API URL (auto-set by script)
- `VITE_ENVIRONMENT` - Environment (development/production)

## 🐛 Troubleshooting

### Backend fails to start
```bash
# Check if port is already in use
lsof -i :5000

# Or use a different port
./start.sh 8000 3000
```

### Database connection error
```bash
# Verify your DATABASE_URL in backend/.env
psql "your_database_url_here"
```

### Frontend can't reach backend
- Make sure backend is running: `curl http://localhost:5000/health`
- Check `.env.development` has correct `VITE_API_URL`
- Clear browser cache (Ctrl+Shift+Delete)

### Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules backend/node_modules
./start.sh
```

### OpenAI API errors
```bash
# Check your API key is valid
cd backend && npm run test:openai

# Verify you have credits on your OpenAI account
# https://platform.openai.com/account/usage/overview
```

## 📚 Next Steps

- **Backend Docs**: `backend/README.md`
- **Chat API**: `backend/routes/chatbot.js`
- **OpenAI Setup**: `backend/CHATGPT_SETUP.md`
- **Production Deployment**: `PRODUCTION_DEPLOYMENT.md`

## ✅ You're All Set!

Your Lynko instance is running and ready to develop. Happy coding! 🎉

---

**Need help?** Check the detailed documentation in:
- Frontend: `README.md`
- Backend: `backend/README.md`
- Deployment: `PRODUCTION_DEPLOYMENT.md`
