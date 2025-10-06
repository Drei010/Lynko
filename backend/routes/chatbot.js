/**
 * Chatbot Routes
 * Public routes for chatbot functionality - no authentication required
 */

const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Chat endpoint for direct message processing
router.post('/chat', chatbotController.chat);

// GET /api/chatbot/health - Health check
router.get('/health', chatbotController.healthCheck);

module.exports = router;