
// Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  console.log('LinkedIn AI Assistant installed');
  
  // Set default settings
  chrome.storage.sync.set({
    tone: 'professional',
    goal: 'continue conversation',
    apiUrl: 'http://localhost:3001/api'
  });
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get(['tone', 'goal', 'apiUrl'], (settings) => {
      sendResponse(settings);
    });
    return true;
  }
});
