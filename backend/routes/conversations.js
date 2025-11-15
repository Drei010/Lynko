/**
 * Conversation Routes
 * Handles conversation management operations
 */

const express = require('express');
const router = express.Router();
const {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
  deleteConversation,
} = require('../controllers/conversationController');
const { validate, schemas } = require('../middleware/validation');

// POST /api/conversations - Create a new conversation
router.post('/', validate(schemas.createConversation), createConversation);

// GET /api/conversations - Get all conversations
router.get('/', getConversations);

// GET /api/conversations/:id - Get a specific conversation
router.get('/:id', validate(schemas.conversationId, 'params'), getConversation);

// PUT /api/conversations/:id - Update a conversation
router.put('/:id', validate(schemas.conversationId, 'params'), validate(schemas.createConversation), updateConversation);

// DELETE /api/conversations/:id - Delete a conversation
router.delete('/:id', validate(schemas.conversationId, 'params'), deleteConversation);

module.exports = router;
