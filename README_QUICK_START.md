
# Quick Start Guide

## Run the entire application with one command:

```bash
bash start.sh
```

This will:
1. Install any missing dependencies
2. Start the backend API on port 3001
3. Start the frontend on port 5000
4. Handle database gracefully (chatbot works without database)

## What you'll see:

- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:3001
- **Chatbot**: Works immediately without login

## Optional: Setup OpenAI for real AI responses

1. Get an API key from https://platform.openai.com/api-keys
2. Add it to Replit Secrets as `OPENAI_API_KEY`
3. Restart the application

Without OpenAI, the chatbot uses intelligent rule-based responses.
