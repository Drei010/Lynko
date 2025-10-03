
// Popup Settings Script

document.addEventListener('DOMContentLoaded', async () => {
  const toneSelect = document.getElementById('tone');
  const goalSelect = document.getElementById('goal');
  const apiUrlInput = document.getElementById('apiUrl');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  // Load saved settings
  const settings = await chrome.storage.sync.get(['tone', 'goal', 'apiUrl']);
  
  if (settings.tone) toneSelect.value = settings.tone;
  if (settings.goal) goalSelect.value = settings.goal;
  if (settings.apiUrl) apiUrlInput.value = settings.apiUrl;

  // Save settings
  saveBtn.addEventListener('click', async () => {
    const newSettings = {
      tone: toneSelect.value,
      goal: goalSelect.value,
      apiUrl: apiUrlInput.value || 'http://localhost:3001/api'
    };

    try {
      await chrome.storage.sync.set(newSettings);
      showStatus('Settings saved successfully!', 'success');
    } catch (error) {
      showStatus('Failed to save settings', 'error');
    }
  });

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';

    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }
});
