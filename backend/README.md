# Lynko Backend - Getting Started

Welcome to the Lynko backend! This is a production-ready Express.js API for running an AI chatbot powered by OpenAI's ChatGPT.

## 📚 Documentation

Choose the guide that fits your needs:

| Document | Time | What It Covers |
|----------|------|----------------|
| **QUICKSTART.md** | 5 min | Get the server running in 5 minutes |
| **CHATGPT_SETUP.md** | 15 min | Complete ChatGPT API setup and configuration |
| **ENV_SETUP_COMPLETE.md** | 10 min | Environment variables and configuration |

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp env.example .env
# Edit .env and add your OPENAI_API_KEY

# 3. Test OpenAI connection
npm run test:openai

# 4. Start the server
npm run dev

# 5. Test an endpoint
curl http://localhost:5000/health
```

## 🔧 What You Get

### ✅ Core Features
- **AI Chatbot** - ChatGPT-powered conversations
- **Conversation Management** - Create, read, update, delete conversations
- **Message Handling** - Send and retrieve messages
- **OpenAI Integration** - Full ChatGPT API support with retry logic
- **Public API** - No authentication required, fully open endpoints
- **Rate Limiting** - Protected against abuse (100 requests/15 min)
- **Error Handling** - Graceful fallbacks when API fails

### ✅ No Authentication
The API is **fully public** with no user accounts or login system.

## 📍 API Endpoints

### Chatbot
- `POST /api/chatbot/chat` - Send a message to the chatbot
- `GET /api/chatbot/health` - Check chatbot status
- `GET /api/chatbot/openai/status` - Check OpenAI configuration
- `POST /api/chatbot/openai/test` - Test OpenAI connection

### Conversations
- `POST /api/conversations` - Create a conversation
- `GET /api/conversations` - List all conversations
- `GET /api/conversations/:id` - Get a specific conversation
- `PUT /api/conversations/:id` - Update a conversation
- `DELETE /api/conversations/:id` - Delete a conversation

### Messages
- `POST /api/conversations/:id/messages` - Send a message
- `GET /api/conversations/:id/messages` - Get all messages

### Health
- `GET /health` - Server health check

## ⚙️ Configuration

### Required Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# OpenAI (REQUIRED)
OPENAI_API_KEY=sk-your_actual_key_here

# Server
PORT=5000
NODE_ENV=development
```

See `ENV_SETUP_COMPLETE.md` for complete configuration details.

## 🧪 Testing

```bash
# Test OpenAI connection
npm run test:openai

# Test API endpoints
npm run test:api

# Run Jest tests (if available)
npm test
```

## 📦 Project Structure

```
backend/
├── server.js                 # Express app entry point
├── config/
│   ├── index.js             # Configuration loader
│   └── database.js          # Database connection
├── controllers/             # Request handlers
│   ├── chatbotController.js
│   ├── conversationController.js
│   └── messageController.js
├── routes/                  # API route definitions
│   ├── chatbot.js
│   ├── conversations.js
│   └── messages.js
├── middleware/              # Express middleware
│   └── validation.js        # Input validation
├── utils/                   # Utility functions
│   ├── openai.js           # OpenAI API integration
│   └── logger.js           # Logging utility
├── database/
│   └── schema.sql          # Database schema
├── scripts/
│   └── test-openai.js      # Test script
├── .env                    # Environment variables (local)
├── env.example             # Environment template
└── README.md              # This file
```

## 🔐 Security

- ✅ **Helmet** - Security headers
- ✅ **CORS** - Configured for specified origins
- ✅ **Rate Limiting** - Prevents abuse
- ✅ **Input Validation** - Joi schema validation
- ✅ **Error Sanitization** - Safe error messages
- ✅ **Environment Variables** - Secrets not in code

## 🚀 Deployment

### Environment Variables Needed

Create a `.env` file with:
```bash
DATABASE_URL=your_production_db_url
OPENAI_API_KEY=your_production_key
PORT=your_port
NODE_ENV=production
```

### Start Server

```bash
npm install
npm start
```

## 🐛 Troubleshooting

### OpenAI connection failing?
1. Check API key in `.env`
2. Run `npm run test:openai`
3. See `CHATGPT_SETUP.md` for detailed help

### Database connection issues?
1. Verify `DATABASE_URL` in `.env`
2. Check database is running
3. Run `node scripts/migrate.js` to setup schema

### Port already in use?
1. Change `PORT` in `.env`
2. Or kill process: `lsof -ti:5000 | xargs kill -9`

## 📚 Learn More

- **OpenAI API**: https://platform.openai.com/docs
- **Express.js**: https://expressjs.com
- **PostgreSQL**: https://www.postgresql.org/docs

## 🤝 Contributing

When adding new features:
1. Update `env.example` for new environment variables
2. Add appropriate validation schemas
3. Document new endpoints
4. Test thoroughly

## 📝 License

MIT

## 🎯 Next Steps

1. **Set up environment**: Copy `env.example` to `.env` and add your API keys
2. **Install dependencies**: `npm install`
3. **Test it works**: `npm run test:openai` and `npm run test:api`
4. **Start developing**: `npm run dev`

---

**Need help?** See the detailed guides in the documentation files above.
