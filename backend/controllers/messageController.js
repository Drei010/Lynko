/**
 * Message Controller
 * Handles message operations and AI integration
 */

const { query } = require('../config/database');

/**
 * Simulated AI Response Generator
 * In a real application, this would integrate with OpenAI, Anthropic, or other AI APIs
 */
const generateAIResponse = async (userMessage, context, aiModel) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Mock AI responses based on the model and context
  const responses = {
    'gpt-3.5-turbo': [
      `Based on your context: "${context}" and your question: "${userMessage}", I can help you with that. GPT-3.5-turbo suggests focusing on the core aspects of your query.`,
      `Here's a comprehensive response from GPT-3.5-turbo regarding your context: "${context}". Your question "${userMessage}" touches on important points that require careful consideration.`,
      `GPT-3.5-turbo analysis of your query: "${userMessage}" in the context of "${context}" reveals several key insights that could be valuable for your situation.`
    ],
    'gpt-4': [
      `GPT-4's advanced reasoning suggests that given your context: "${context}", your question "${userMessage}" requires a nuanced approach. Let me break this down systematically.`,
      `Based on the sophisticated analysis capabilities of GPT-4, your question "${userMessage}" within the context of "${context}" presents interesting challenges that I can help address.`,
      `GPT-4's enhanced understanding indicates that your query: "${userMessage}" is particularly relevant given the context: "${context}". Here's my detailed response.`
    ],
    'claude-instant-1': [
      `Claude Instant-1 processing your request: "${userMessage}" with context: "${context}". I'll provide a helpful response based on this information.`,
      `Analyzing your question "${userMessage}" in the context of "${context}" using Claude Instant-1's capabilities. Here's what I can suggest.`,
      `Claude Instant-1's perspective on your query: "${userMessage}" considering the context: "${context}" leads to these insights.`
    ],
    'claude-2': [
      `Claude-2's advanced reasoning about your question: "${userMessage}" within the context: "${context}" suggests a thoughtful approach to your situation.`,
      `Using Claude-2's enhanced capabilities, I can provide a comprehensive response to "${userMessage}" based on your context: "${context}".`,
      `Claude-2 analysis of your query: "${userMessage}" reveals important considerations given your context: "${context}". Here's my detailed response.`
    ],
    'gemini-pro': [
      `Gemini Pro's multimodal understanding of your question: "${userMessage}" in context: "${context}" provides these insights for your consideration.`,
      `Based on Gemini Pro's capabilities, your query "${userMessage}" within the context of "${context}" can be addressed through several approaches.`,
      `Gemini Pro's analysis of "${userMessage}" considering your context: "${context}" suggests these recommendations for your situation.`
    ]
  };

  const modelResponses = responses[aiModel] || responses['gpt-3.5-turbo'];
  const randomResponse = modelResponses[Math.floor(Math.random() * modelResponses.length)];
  
  return randomResponse;
};

/**
 * Add a message to a conversation and get AI response
 * POST /api/conversations/:id/messages
 */
const createMessage = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;

    // Verify conversation belongs to user
    const conversationResult = await query(
      'SELECT * FROM conversations WHERE id = $1 AND user_id = $2',
      [conversationId, userId]
    );

    if (conversationResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    const conversation = conversationResult.rows[0];

    // Save user message
    const userMessageResult = await query(
      'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3) RETURNING *',
      [conversationId, 'user', content]
    );

    const userMessage = userMessageResult.rows[0];

    // Generate AI response
    const aiResponse = await generateAIResponse(
      content,
      conversation.context,
      conversation.ai_model
    );

    // Save AI response
    const aiMessageResult = await query(
      'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3) RETURNING *',
      [conversationId, 'assistant', aiResponse]
    );

    const aiMessage = aiMessageResult.rows[0];

    // Update conversation's updated_at timestamp
    await query(
      'UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [conversationId]
    );

    res.status(201).json({
      success: true,
      message: 'Message sent and AI response received',
      data: {
        user_message: {
          id: userMessage.id,
          role: userMessage.role,
          content: userMessage.content,
          created_at: userMessage.created_at,
        },
        ai_message: {
          id: aiMessage.id,
          role: aiMessage.role,
          content: aiMessage.content,
          created_at: aiMessage.created_at,
        },
      },
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Get all messages for a specific conversation
 * GET /api/conversations/:id/messages
 */
const getMessages = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;
    const { page = 1, limit = 50 } = req.query;

    const offset = (page - 1) * limit;

    // Verify conversation belongs to user
    const conversationResult = await query(
      'SELECT id FROM conversations WHERE id = $1 AND user_id = $2',
      [conversationId, userId]
    );

    if (conversationResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Get messages
    const result = await query(
      'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC LIMIT $2 OFFSET $3',
      [conversationId, limit, offset]
    );

    // Get total count for pagination
    const countResult = await query(
      'SELECT COUNT(*) FROM messages WHERE conversation_id = $1',
      [conversationId]
    );

    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: {
        messages: result.rows.map(msg => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          created_at: msg.created_at,
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
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Delete a message
 * DELETE /api/messages/:id
 */
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const userId = req.user.id;

    // Verify message belongs to user through conversation
    const messageResult = await query(`
      SELECT m.id FROM messages m
      JOIN conversations c ON m.conversation_id = c.id
      WHERE m.id = $1 AND c.user_id = $2
    `, [messageId, userId]);

    if (messageResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Delete message
    await query('DELETE FROM messages WHERE id = $1', [messageId]);

    res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};
