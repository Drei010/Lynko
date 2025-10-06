
# LinkedIn AI Assistant Extension - Quick Setup

## 🚀 Quick Start

### 1. Load the Extension

**Chrome/Edge:**
```
1. Open chrome://extensions/
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the `linkedin-extension` folder
```

**Firefox:**
```
1. Open about:debugging#/runtime/this-firefox
2. Click "Load Temporary Add-on"
3. Select any file in `linkedin-extension` folder
```

### 2. Configure Backend

The extension needs your chatbot API running. Update the API URL in extension settings:

1. Click extension icon in browser toolbar
2. Set "Backend API URL" to your backend (default: `http://localhost:3001/api`)
3. Choose your preferred tone and goal
4. Click "Save Settings"

### 3. Use on LinkedIn

1. Go to https://www.linkedin.com/messaging/
2. Open any conversation
3. Click "Start AI Assistant" button
4. Send a test message to yourself or receive one
5. AI suggestion will appear above message box

## 🎨 Customization

### Extension Settings

- **Tone**: professional, casual, friendly, formal
- **Goal**: continue conversation, schedule meeting, provide info, etc.
- **API URL**: Your backend endpoint

### Backend Integration

The extension uses your existing `/api/chatbot/chat` endpoint. Make sure:

- Backend is running on port 3001
- CORS allows extension origins
- OpenAI key is configured (optional - falls back to rule-based)

## 🔧 Testing

1. **Backend Health**: Visit `http://localhost:3001/api/chatbot/health`
2. **Extension Active**: Button should say "Stop AI" when active
3. **Suggestions**: Send/receive message, suggestion appears in ~2 seconds

## 📋 Architecture

```
LinkedIn Page → Extension (content.js) → Your Backend API → OpenAI/Rules → Response → Extension → User Approval
```

## 🛡️ Privacy

- No data stored permanently
- All suggestions require user approval
- Processes locally in browser
- Backend API under your control

## 🐛 Troubleshooting

**No suggestions?**
- Activate AI Assistant (click button)
- Check backend is running
- Verify API URL in settings

**Backend errors?**
- Check CORS configuration
- Ensure `/api/chatbot/chat` endpoint works
- Test with curl or Postman first

**UI not appearing?**
- Refresh LinkedIn page
- Reinstall extension
- Check browser console for errors
