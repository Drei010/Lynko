
# OpenAI API Setup for Chatbot

This guide will help you set up OpenAI's API to power the chatbot with real AI responses.

## Getting Your OpenAI API Key

1. **Sign up for OpenAI**: Go to [https://platform.openai.com/signup](https://platform.openai.com/signup)
2. **Navigate to API Keys**: Once logged in, go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
3. **Create New Key**: Click "Create new secret key" and copy the key (you won't be able to see it again!)

## Configure Your Environment

1. **Add to Replit Secrets**: 
   - Open the Secrets tool in Replit (lock icon in the sidebar)
   - Add a new secret with key: `OPENAI_API_KEY`
   - Paste your OpenAI API key as the value

2. **Or use .env file** (for local development):
   - Copy `env.example` to `.env`
   - Add your key: `OPENAI_API_KEY=sk-...`

## Pricing & Free Tier

- OpenAI offers **$5 in free credits** for new accounts
- GPT-3.5-turbo costs approximately **$0.002 per 1,000 tokens**
- Each conversation typically uses 100-300 tokens
- Your $5 credit = ~2,500 conversations

## Testing

After adding your API key:

1. Restart the backend workflow
2. Visit `/api/chatbot/health` to verify OpenAI is configured
3. Test the chatbot - it should now use real ChatGPT responses!

## Fallback Behavior

If no API key is configured, the chatbot automatically falls back to rule-based responses, so your app will always work.
