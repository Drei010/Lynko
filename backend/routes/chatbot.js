/**
 * Chatbot Routes
 * Public routes for chatbot functionality - no authentication required
 */

const express = require('express');
const router = express.Router();
const { chat, healthCheck } = require('../controllers/chatbotController');

// POST /api/chatbot/chat - Send message and get AI response
router.post('/chat', chat);

// GET /api/chatbot/health - Health check
router.get('/health', healthCheck);

module.exports = router;
