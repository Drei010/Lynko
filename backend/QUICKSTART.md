# Quick Reference - ChatGPT API Setup

## 🚀 5-Minute Quick Start

### 1. Get API Key
Visit https://platform.openai.com/account/api-keys and create a new key

### 2. Configure Backend
```bash
cd backend
cp env.example .env
# Edit .env and add: OPENAI_API_KEY=sk-your_key_here
```

### 3. Test Connection
```bash
npm install
npm run test:openai
```

### 4. Run Server
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 5. Test Chat
```bash
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

---

## 📍 Key Files

| File | Purpose |
|------|---------|
| `utils/openai.js` | Core OpenAI integration |
| `controllers/chatbotController.js` | Request handler |
| `routes/chatbot.js` | API endpoints |
| `scripts/test-openai.js` | Connection test |
| `.env` | Configuration (KEEP SECRET!) |
| `env.example` | Configuration template |

---

## 🔌 API Endpoints

### Chat
```bash
POST /api/chatbot/chat
Content-Type: application/json

{
  "message": "Your message here",
  "config": {
    "model": "gpt-3.5-turbo",
    "product": "Your Product",
    "goal": "book a demo"
  }
}
```

### Check Status
```bash
GET /api/chatbot/openai/status
# Returns: Configuration, API key length, model
```

### Test Connection
```bash
POST /api/chatbot/openai/test
# Tests actual API connectivity
```

### Health Check
```bash
GET /api/chatbot/health
# Returns: Service status + OpenAI status
```

---

## ⚙️ Configuration

**Required:**
- `OPENAI_API_KEY` - Your OpenAI API key

**Optional:**
- `OPENAI_MODEL` - Model to use (default: gpt-3.5-turbo)
- `PORT` - Server port (default: 5000)

---

## 🧪 Testing

```bash
# Comprehensive test
npm run test:openai

# Manual test
curl http://localhost:5000/api/chatbot/health
```

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| "API key not configured" | Add to .env: `OPENAI_API_KEY=sk-...` |
| "Invalid API key" | Check https://platform.openai.com |
| "Model not available" | Use `gpt-3.5-turbo` (most available) |
| "Rate limited" | System retries automatically |
| "Timeout" | Fallback responses used automatically |

---

## 📊 Fallback System

If OpenAI API fails or is unavailable:
- ✅ System automatically falls back
- ✅ Rule-based responses sent to user
- ✅ No service interruption
- ✅ Logged for debugging

---

## 🔒 Security

- ✅ API key in `.env` (in `.gitignore`)
- ✅ Never hardcode secrets
- ✅ Production errors hide sensitive data
- ✅ All requests logged

---

## 💡 Pro Tips

1. Start with `gpt-3.5-turbo` (cheapest, fastest)
2. Monitor usage: https://platform.openai.com/account/usage
3. Set spending limits in OpenAI dashboard
4. Use fallback system for redundancy
5. Test regularly with `npm run test:openai`

---

## 📞 Documentation

- **Setup Guide:** `CHATGPT_SETUP.md`
- **Integration Summary:** `CHATGPT_INTEGRATION_SUMMARY.md`
- **OpenAI Docs:** https://platform.openai.com/docs

---

**Status:** ✅ Ready to Use
