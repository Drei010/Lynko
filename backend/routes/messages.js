/**
 * Message Routes
 * Handles message operations and AI integration
 */

const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

// All routes require authentication
router.use(authenticateToken);

// POST /api/conversations/:id/messages - Add a message to a conversation and get AI response
router.post('/:id/messages', validate(schemas.conversationId, 'params'), validate(schemas.createMessage), createMessage);

// GET /api/conversations/:id/messages - Get all messages for a specific conversation
router.get('/:id/messages', validate(schemas.conversationId, 'params'), getMessages);

// DELETE /api/messages/:id - Delete a message
router.delete('/messages/:id', validate(schemas.conversationId, 'params'), deleteMessage);

module.exports = router;
