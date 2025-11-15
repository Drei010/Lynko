/**
 * Chatbot Routes
 * Public routes for chatbot functionality - no authentication required
 */

const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const openaiService = require('../utils/openai');

// Chat endpoint for direct message processing
router.post('/chat', chatbotController.chat);

// GET /api/chatbot/health - Health check
router.get('/health', chatbotController.healthCheck);

// GET /api/chatbot/openai/status - OpenAI configuration status
router.get('/openai/status', (req, res) => {
  const status = openaiService.getStatus();
  res.json({
    success: true,
    data: status,
    timestamp: new Date().toISOString(),
  });
});

// POST /api/chatbot/openai/test - Test OpenAI API connection
router.post('/openai/test', async (req, res) => {
  try {
    const result = await openaiService.testConnection();
    res.json({
      success: result.success,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'OpenAI connection test failed',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router;