
// LinkedIn AI Assistant - Content Script
// Integrates with LinkedIn messaging to provide AI-powered suggestions

let isAssistantActive = false;
let conversationContext = [];
let aiSuggestionPanel = null;
let apiBaseUrl = 'http://localhost:3001/api'; // Update with your backend URL

// Initialize the extension
function init() {
  console.log('LinkedIn AI Assistant initialized');
  injectAssistantButton();
  observeMessages();
}

// Inject the AI Assistant activation button
function injectAssistantButton() {
  const messageContainer = document.querySelector('.msg-form__contenteditable');
  
  if (!messageContainer || document.querySelector('.ai-assistant-btn')) {
    return;
  }

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'ai-assistant-container';
  buttonContainer.innerHTML = `
    <button class="ai-assistant-btn" id="toggleAI">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-3.86-.94-6.5-4.5-6.5-8.5V8.3l6.5-3.11 6.5 3.11V12c0 4-2.64 7.56-6.5 8.5z"/>
      </svg>
      ${isAssistantActive ? 'Stop AI' : 'Start AI Assistant'}
    </button>
  `;

  const formFooter = document.querySelector('.msg-form__footer');
  if (formFooter) {
    formFooter.prepend(buttonContainer);
    
    const toggleBtn = document.getElementById('toggleAI');
    toggleBtn.addEventListener('click', toggleAssistant);
  }
}

// Toggle AI Assistant
function toggleAssistant() {
  isAssistantActive = !isAssistantActive;
  const btn = document.getElementById('toggleAI');
  
  if (btn) {
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-3.86-.94-6.5-4.5-6.5-8.5V8.3l6.5-3.11 6.5 3.11V12c0 4-2.64 7.56-6.5 8.5z"/>
      </svg>
      ${isAssistantActive ? 'Stop AI' : 'Start AI Assistant'}
    `;
    btn.classList.toggle('active', isAssistantActive);
  }

  if (isAssistantActive) {
    analyzeConversation();
  } else {
    removeSuggestionPanel();
  }
}

// Observe new messages
function observeMessages() {
  const messageList = document.querySelector('.msg-s-message-list__container');
  
  if (!messageList) {
    setTimeout(observeMessages, 1000);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    if (isAssistantActive) {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          analyzeConversation();
        }
      });
    }
  });

  observer.observe(messageList, {
    childList: true,
    subtree: true
  });
}

// Analyze conversation and extract context
function analyzeConversation() {
  const messages = document.querySelectorAll('.msg-s-message-group__message');
  conversationContext = [];

  messages.forEach((msg, index) => {
    const isReceived = msg.querySelector('.msg-s-event-listitem__message-bubble--received');
    const textElement = msg.querySelector('.msg-s-event-listitem__body');
    
    if (textElement) {
      conversationContext.push({
        role: isReceived ? 'user' : 'assistant',
        content: textElement.textContent.trim(),
        timestamp: Date.now() - (messages.length - index) * 60000
      });
    }
  });

  // Get last received message
  const lastReceivedMsg = conversationContext.filter(m => m.role === 'user').pop();
  
  if (lastReceivedMsg && isAssistantActive) {
    generateReplySuggestion(lastReceivedMsg.content);
  }
}

// Generate AI reply suggestion
async function generateReplySuggestion(lastMessage) {
  try {
    // Get user settings
    const settings = await chrome.storage.sync.get(['tone', 'goal', 'apiUrl']);
    const tone = settings.tone || 'professional';
    const goal = settings.goal || 'continue conversation';
    const baseUrl = settings.apiUrl || apiBaseUrl;

    // Build conversation context
    const conversationText = conversationContext
      .slice(-5) // Last 5 messages
      .map(m => `${m.role === 'user' ? 'Them' : 'Me'}: ${m.content}`)
      .join('\n');

    const response = await fetch(`${baseUrl}/chatbot/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Context:\n${conversationText}\n\nGenerate a ${tone} reply to continue the conversation with the goal to: ${goal}`,
        config: {
          product: 'LinkedIn conversation',
          goal: goal,
          goalLink: '',
          fallback: 'continue naturally',
          fallbackLink: ''
        }
      })
    });

    const data = await response.json();
    
    if (data.success && data.data) {
      showSuggestionPanel(data.data.aiResponse);
    }
  } catch (error) {
    console.error('Error generating suggestion:', error);
    showErrorMessage('Failed to generate suggestion. Please check your settings.');
  }
}

// Show suggestion panel
function showSuggestionPanel(suggestion) {
  removeSuggestionPanel();

  const messageBox = document.querySelector('.msg-form__contenteditable');
  if (!messageBox) return;

  aiSuggestionPanel = document.createElement('div');
  aiSuggestionPanel.className = 'ai-suggestion-panel';
  aiSuggestionPanel.innerHTML = `
    <div class="ai-suggestion-header">
      <span class="ai-badge">AI Suggestion</span>
      <button class="ai-close-btn" id="closeSuggestion">×</button>
    </div>
    <div class="ai-suggestion-content">
      <p>${suggestion}</p>
    </div>
    <div class="ai-suggestion-actions">
      <button class="ai-btn ai-btn-secondary" id="editSuggestion">Edit</button>
      <button class="ai-btn ai-btn-secondary" id="ignoreSuggestion">Ignore</button>
      <button class="ai-btn ai-btn-primary" id="sendSuggestion">Approve & Send</button>
    </div>
  `;

  const formContainer = document.querySelector('.msg-form__msg-content-container');
  if (formContainer) {
    formContainer.appendChild(aiSuggestionPanel);

    // Event listeners
    document.getElementById('closeSuggestion').addEventListener('click', removeSuggestionPanel);
    document.getElementById('ignoreSuggestion').addEventListener('click', removeSuggestionPanel);
    document.getElementById('editSuggestion').addEventListener('click', () => editSuggestion(suggestion));
    document.getElementById('sendSuggestion').addEventListener('click', () => sendSuggestion(suggestion));
  }
}

// Edit suggestion
function editSuggestion(suggestion) {
  const messageBox = document.querySelector('.msg-form__contenteditable');
  if (messageBox) {
    messageBox.textContent = suggestion;
    messageBox.focus();
    removeSuggestionPanel();
  }
}

// Send suggestion
function sendSuggestion(suggestion) {
  const messageBox = document.querySelector('.msg-form__contenteditable');
  const sendButton = document.querySelector('.msg-form__send-button');
  
  if (messageBox && sendButton) {
    messageBox.textContent = suggestion;
    
    // Trigger input event to enable send button
    const event = new Event('input', { bubbles: true });
    messageBox.dispatchEvent(event);
    
    setTimeout(() => {
      sendButton.click();
      removeSuggestionPanel();
    }, 100);
  }
}

// Remove suggestion panel
function removeSuggestionPanel() {
  if (aiSuggestionPanel) {
    aiSuggestionPanel.remove();
    aiSuggestionPanel = null;
  }
}

// Show error message
function showErrorMessage(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'ai-error-message';
  errorDiv.textContent = message;
  
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Reinject button when navigating
setInterval(() => {
  if (!document.querySelector('.ai-assistant-btn')) {
    injectAssistantButton();
  }
}, 2000);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
