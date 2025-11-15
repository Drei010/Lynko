# Lynko Backend - ChatGPT API Setup Guide

This guide explains how to configure and verify that your Lynko backend is properly connected to the ChatGPT API.

## 📋 Prerequisites

- Node.js 18+ installed
- OpenAI account with API access
- Valid OpenAI API key

## 🚀 Quick Setup

### Step 1: Get Your OpenAI API Key

1. Go to [OpenAI API Keys](https://platform.openai.com/account/api-keys)
2. Sign in to your OpenAI account (or create one)
3. Click "Create new secret key"
4. Copy the generated API key (starts with `sk-`)
5. **Store it securely** - you won't be able to see it again

### Step 2: Configure Environment Variables

1. In the `backend` directory, create a `.env` file:
   ```bash
   cp env.example .env
   ```

2. Open `.env` and update the `OPENAI_API_KEY`:
   ```plaintext
   OPENAI_API_KEY=sk-your_actual_api_key_here
   ```

3. Optionally, set the model (default is `gpt-3.5-turbo`):
   ```plaintext
   OPENAI_MODEL=gpt-3.5-turbo
   ```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Test the Connection

Run the OpenAI connection test:

```bash
npm run test:openai
```

You should see output like:
```
✅ OpenAI API key is configured
✅ Connected to OpenAI API successfully
✅ Message generated successfully
✅ AI response generated with configuration

Test Summary
Total Tests: 4
✅ Passed: 4
Success Rate: 100%

✨ Your Lynko backend is now configured to use ChatGPT API!
```

## 📍 File Structure

The ChatGPT integration consists of the following files:

```
backend/
├── utils/
│   └── openai.js              # OpenAI API integration utility
├── controllers/
│   └── chatbotController.js   # Chatbot request handler (uses openai.js)
├── routes/
│   └── chatbot.js             # API routes for chatbot
├── scripts/
│   └── test-openai.js         # Connection test script
├── env.example                # Environment variables template
└── package.json               # Includes test:openai script
```

## 🔧 How It Works

### OpenAI Utility (`utils/openai.js`)

This module provides:

- **`callChatGPT(message, options)`** - Direct API calls with retry logic
  - Handles rate limiting with exponential backoff
  - Validates API credentials
  - Timeouts at 10 seconds
  - Retries up to 2 times on server errors

- **`generateAIResponse(message, config)`** - High-level response generation
  - Includes system prompt configuration
  - Accepts product, goal, and fallback parameters
  - Returns both API response and metadata

- **`testConnection()`** - Verify API connectivity
- **`getStatus()`** - Get configuration status
- **`isConfigured()`** - Check if API key is set

### Chatbot Controller (`controllers/chatbotController.js`)

The controller now:
- Uses the OpenAI utility for API calls
- Falls back to rule-based responses if API fails
- Includes OpenAI status in health checks

### Fallback System

If the OpenAI API is:
- **Not configured** (no API key) → Uses rule-based fallback responses
- **Unavailable** (timeout, server error) → Automatically falls back to rule-based responses
- **Rate limited** → Retries with exponential backoff

## 📊 Available Endpoints

### Chat Endpoint

```bash
POST /api/chatbot/chat
Content-Type: application/json

{
  "message": "Tell me about your product",
  "config": {
    "model": "gpt-3.5-turbo",
    "product": "Lynko SaaS",
    "goal": "book a demo",
    "goalLink": "https://example.com/demo"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userMessage": "Tell me about your product",
    "reply": "Lynko SaaS is a powerful platform...",
    "timestamp": "2025-01-01T00:00:00.000Z",
    "usedFallback": false
  }
}
```

### Health Check

```bash
GET /api/chatbot/health
```

**Response:**
```json
{
  "success": true,
  "message": "Chatbot service is running",
  "openai_configured": true,
  "openai_status": {
    "configured": true,
    "apiKeyLength": 48,
    "apiKeyPrefix": "sk-1234567890",
    "model": "gpt-3.5-turbo"
  },
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

## 🧪 Testing

### Run OpenAI Connection Test

```bash
npm run test:openai
```

This script:
1. ✅ Checks environment configuration
2. ✅ Tests API connectivity
3. ✅ Generates a sample message
4. ✅ Tests with configuration parameters

### Manual Testing with cURL

```bash
# Test chatbot endpoint
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, can you help me?",
    "config": {
      "model": "gpt-3.5-turbo",
      "product": "Lynko"
    }
  }'

# Check health and OpenAI status
curl http://localhost:5000/api/chatbot/health
```

## ⚠️ Troubleshooting

### Issue: "OpenAI API key not configured"

**Solution:**
1. Create a `.env` file in the `backend` directory
2. Add your API key: `OPENAI_API_KEY=sk-your_key_here`
3. Restart the server

### Issue: "Invalid OpenAI API key"

**Solution:**
1. Double-check your API key at [platform.openai.com](https://platform.openai.com)
2. Ensure it hasn't been revoked
3. Create a new key if needed

### Issue: "Model 'gpt-4' is not available"

**Solution:**
1. Ensure your OpenAI account has access to the model
2. Use `gpt-3.5-turbo` (most widely available)
3. Check your account tier at [openai.com](https://openai.com)

### Issue: Rate Limited (429 Error)

**Solution:**
1. The system automatically retries with exponential backoff
2. Check your API usage at [platform.openai.com/account/usage](https://platform.openai.com/account/usage)
3. Upgrade your OpenAI plan if needed

### Issue: Timeout or Connection Error

**Solution:**
1. Check your internet connection
2. Verify OpenAI API is not down: [status.openai.com](https://status.openai.com)
3. The system falls back to rule-based responses on timeout

## 📈 Performance Considerations

### Model Selection

| Model | Speed | Cost | Quality |
|-------|-------|------|---------|
| `gpt-3.5-turbo` | Fast | Low | Good |
| `gpt-4-turbo-preview` | Medium | Medium | Excellent |
| `gpt-4` | Slow | High | Best |

**Recommended:** `gpt-3.5-turbo` for best cost/performance ratio.

### Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configure in `.env`: `RATE_LIMIT_MAX_REQUESTS`

### Timeout

- Default: 10 seconds per API call
- Longer timeout may improve reliability on slow connections

## 💰 Pricing

- **gpt-3.5-turbo**: $0.50 per 1M input tokens, $1.50 per 1M output tokens
- **gpt-4-turbo**: $10 per 1M input tokens, $30 per 1M output tokens

Monitor your usage at [platform.openai.com/account/billing/overview](https://platform.openai.com/account/billing/overview).

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Keep API keys secret** - Don't share with anyone
3. **Rotate keys regularly** - Delete old keys and create new ones
4. **Use environment variables** - Never hardcode API keys
5. **Monitor API usage** - Check for unauthorized access

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Chat Completions Guide](https://platform.openai.com/docs/guides/gpt)
- [Model Comparison](https://platform.openai.com/docs/models)
- [API Reference](https://platform.openai.com/docs/api-reference)

## ✨ Next Steps

1. ✅ Configure `.env` with your API key
2. ✅ Run `npm run test:openai` to verify setup
3. ✅ Start the server: `npm run dev`
4. ✅ Test the chatbot endpoint
5. ✅ Monitor API usage and costs

## 📞 Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review OpenAI's [status page](https://status.openai.com)
3. Check OpenAI's [documentation](https://platform.openai.com/docs)
4. Open an issue on the project repository

---

**Last Updated:** November 2025
