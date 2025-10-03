
# LinkedIn AI Assistant - Browser Extension

AI-powered reply suggestions for LinkedIn messages that integrate with your chatbot backend.

## Features

- **Real-time Analysis**: Monitors LinkedIn conversations and understands context
- **AI-Powered Suggestions**: Generates contextual replies using your chatbot API
- **User Control**: All suggestions require approval before sending
- **Customizable**: Configure tone, goals, and behavior
- **Non-Intrusive**: Blends seamlessly with LinkedIn's interface

## Installation

### Chrome/Edge

1. Open Chrome/Edge and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `linkedin-extension` folder

### Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select any file in the `linkedin-extension` folder

## Setup

1. **Backend API**: Ensure your chatbot backend is running (default: `http://localhost:3001/api`)
2. **Configure Settings**: Click the extension icon and set your preferences:
   - Reply tone (professional, casual, friendly, formal)
   - Conversation goal (continue, schedule meeting, etc.)
   - Backend API URL (if different from default)

## Usage

1. **Open LinkedIn**: Navigate to LinkedIn Messaging
2. **Start Assistant**: Click "Start AI Assistant" button in the message compose area
3. **Receive Suggestions**: When new messages arrive, AI suggestions appear above the message box
4. **Choose Action**:
   - **Approve & Send**: Send the suggestion directly
   - **Edit**: Modify the suggestion before sending
   - **Ignore**: Dismiss and type manually

## How It Works

1. **Conversation Analysis**: Extension reads the message thread (last 5 messages)
2. **Context Building**: Creates context from conversation history
3. **AI Generation**: Sends to your backend API for reply generation
4. **User Approval**: Displays suggestion in a preview panel
5. **Action**: User decides to send, edit, or ignore

## Privacy & Security

- **No Data Storage**: Conversations are processed in real-time only
- **User Consent**: All messages require explicit approval
- **Local Processing**: Extension runs locally in your browser
- **API Security**: Configure your own secure backend endpoint

## Customization

### Tone Options
- Professional
- Casual
- Friendly
- Formal

### Goal Options
- Continue conversation
- Schedule meeting
- Provide information
- Politely decline
- Ask questions

## Troubleshooting

**Suggestions not appearing?**
- Check that AI Assistant is activated (button should show "Stop AI")
- Verify backend API is running
- Check extension console for errors

**Can't connect to backend?**
- Update API URL in extension settings
- Ensure backend is accessible from your browser
- Check CORS settings on your backend

**Button not visible?**
- Refresh LinkedIn page
- Check you're on `/messaging/*` path
- Extension may need reinstalling

## Development

### File Structure
```
linkedin-extension/
├── manifest.json       # Extension configuration
├── content.js         # Main integration logic
├── styles.css         # UI styling
├── popup.html         # Settings interface
├── popup.js           # Settings logic
├── background.js      # Service worker
└── icons/            # Extension icons
```

### API Integration

The extension expects your backend to have this endpoint:

```
POST /api/chatbot/chat
{
  "message": "conversation context and request",
  "config": {
    "product": "LinkedIn conversation",
    "goal": "user's goal",
    ...
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "aiResponse": "suggested reply text"
  }
}
```

## Compliance

This extension:
- Does not violate LinkedIn's Terms of Service
- Does not automate sending without user approval
- Does not store or transmit user data without consent
- Operates transparently with user control

## Support

For issues or questions, refer to the main project documentation or create an issue in the repository.
