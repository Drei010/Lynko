/**
 * Conversation Controller
 * Handles conversation management operations
 */

const { query } = require('../config/database');

/**
 * Create a new conversation
 * POST /api/conversations
 */
const createConversation = async (req, res) => {
  try {
    const { title, context, ai_model } = req.body;
    const userId = req.user.id;

    const result = await query(
      'INSERT INTO conversations (user_id, title, context, ai_model) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, title, context || '', ai_model]
    );

    const conversation = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Conversation created successfully',
      data: {
        conversation: {
          id: conversation.id,
          title: conversation.title,
          context: conversation.context,
          ai_model: conversation.ai_model,
          created_at: conversation.created_at,
          updated_at: conversation.updated_at,
        },
      },
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Get all conversations for the authenticated user
 * GET /api/conversations
 */
const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    // Get conversations with message count
    const result = await query(`
      SELECT 
        c.*,
        COUNT(m.id) as message_count,
        MAX(m.created_at) as last_message_at
      FROM conversations c
      LEFT JOIN messages m ON c.id = m.conversation_id
      WHERE c.user_id = $1
      GROUP BY c.id
      ORDER BY c.updated_at DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);

    // Get total count for pagination
    const countResult = await query(
      'SELECT COUNT(*) FROM conversations WHERE user_id = $1',
      [userId]
    );

    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: {
        conversations: result.rows.map(conv => ({
          id: conv.id,
          title: conv.title,
          context: conv.context,
          ai_model: conv.ai_model,
          message_count: parseInt(conv.message_count),
          last_message_at: conv.last_message_at,
          created_at: conv.created_at,
          updated_at: conv.updated_at,
        })),
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_count: totalCount,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Get a specific conversation
 * GET /api/conversations/:id
 */
const getConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;

    // Verify conversation belongs to user
    const result = await query(
      'SELECT * FROM conversations WHERE id = $1 AND user_id = $2',
      [conversationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    const conversation = result.rows[0];

    res.json({
      success: true,
      data: {
        conversation: {
          id: conversation.id,
          title: conversation.title,
          context: conversation.context,
          ai_model: conversation.ai_model,
          created_at: conversation.created_at,
          updated_at: conversation.updated_at,
        },
      },
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Update a conversation
 * PUT /api/conversations/:id
 */
const updateConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;
    const { title, context, ai_model } = req.body;

    // Verify conversation belongs to user
    const existingResult = await query(
      'SELECT id FROM conversations WHERE id = $1 AND user_id = $2',
      [conversationId, userId]
    );

    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Update conversation
    const result = await query(
      'UPDATE conversations SET title = $1, context = $2, ai_model = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [title, context, ai_model, conversationId, userId]
    );

    const conversation = result.rows[0];

    res.json({
      success: true,
      message: 'Conversation updated successfully',
      data: {
        conversation: {
          id: conversation.id,
          title: conversation.title,
          context: conversation.context,
          ai_model: conversation.ai_model,
          created_at: conversation.created_at,
          updated_at: conversation.updated_at,
        },
      },
    });
  } catch (error) {
    console.error('Update conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Delete a conversation
 * DELETE /api/conversations/:id
 */
const deleteConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;

    // Verify conversation belongs to user and delete
    const result = await query(
      'DELETE FROM conversations WHERE id = $1 AND user_id = $2 RETURNING id',
      [conversationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    res.json({
      success: true,
      message: 'Conversation deleted successfully',
    });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
  deleteConversation,
};
