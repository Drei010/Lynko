/**
 * OpenAI/ChatGPT Integration Utility
 * Handles all OpenAI API interactions with error handling, retries, and fallback logic
 */

const axios = require('axios');
const logger = require('./logger');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // milliseconds

/**
 * Validates that the OpenAI API key is configured
 * @returns {boolean} True if API key is available
 */
const isConfigured = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    logger.warn('OpenAI API key is not configured in environment variables');
    return false;
  }
  return true;
};

/**
 * Sleep utility for retry delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Call OpenAI Chat Completions API with retry logic
 * @param {string} userMessage - The user's message
 * @param {Object} options - Configuration options
 * @param {string} options.model - Model to use (default: gpt-3.5-turbo)
 * @param {string} options.systemPrompt - System prompt for the conversation
 * @param {number} options.maxTokens - Maximum tokens in response (default: 150)
 * @param {number} options.temperature - Temperature for response creativity (default: 0.7)
 * @param {number} options.retryAttempt - Current retry attempt (internal use)
 * @returns {Promise<string>} The AI response text
 * @throws {Error} If API call fails after retries
 */
const callChatGPT = async (userMessage, options = {}) => {
  const {
    model = 'gpt-3.5-turbo',
    systemPrompt = 'You are a helpful AI assistant.',
    maxTokens = 150,
    temperature = 0.7,
    retryAttempt = 0,
  } = options;

  // Check if API is configured
  if (!isConfigured()) {
    throw new Error('OpenAI API key not configured');
  }

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    logger.info(`Calling OpenAI API with model: ${model}`);

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: maxTokens,
        temperature: temperature,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      }
    );

    logger.info('OpenAI API call successful');

    // Extract the response text
    const content = response.data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid response format from OpenAI API');
    }

    return content.trim();

  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message;
    const errorCode = error.response?.status;

    // Log detailed error information
    logger.error('OpenAI API Error', {
      status: errorCode,
      message: errorMessage,
      retryAttempt,
      model,
    });

    // Retry logic for specific error codes
    if (retryAttempt < MAX_RETRIES) {
      // Retry on rate limit (429), server errors (5xx), and timeout
      if (errorCode === 429 || (errorCode >= 500 && errorCode < 600) || error.code === 'ECONNABORTED') {
        logger.info(`Retrying OpenAI API call (attempt ${retryAttempt + 1}/${MAX_RETRIES})`);
        await sleep(RETRY_DELAY * (retryAttempt + 1)); // Exponential backoff
        
        return callChatGPT(userMessage, {
          ...options,
          retryAttempt: retryAttempt + 1,
        });
      }
    }

    // Don't retry on authentication errors
    if (errorCode === 401) {
      throw new Error('Invalid OpenAI API key. Please check your credentials.');
    }

    // Don't retry on invalid model
    if (errorCode === 404) {
      throw new Error(`Model "${model}" is not available. Check the model name and your API key's access.`);
    }

    // For other errors or after retries exhausted
    throw new Error(`OpenAI API Error: ${errorMessage}`);
  }
};

/**
 * Generate a response using OpenAI API
 * Includes validation and error handling
 * @param {string} userMessage - The user's message
 * @param {Object} config - Configuration object
 * @param {string} config.model - AI model to use
 * @param {string} config.product - Product name for context
 * @param {string} config.goal - Goal for the conversation
 * @param {string} config.goalLink - Link for the goal
 * @param {string} config.fallback - Fallback message
 * @param {string} config.fallbackLink - Fallback link
 * @returns {Promise<{content: string, usedAPI: boolean, model: string}>} Response object
 */
const generateAIResponse = async (userMessage, config = {}) => {
  const {
    model = 'gpt-3.5-turbo',
    product = 'our product',
    goal = 'book a demo',
    goalLink = '',
    fallback = 'visit our website',
    fallbackLink = '',
  } = config;

  try {
    // Validate input
    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
      throw new Error('User message cannot be empty');
    }

    // Create system prompt with context
    const systemPrompt = `You are a helpful AI sales assistant for ${product}. Your main goal is to help users ${goal}. 
If users are interested, direct them to: ${goalLink || 'schedule a meeting'}.
If users are not interested, suggest they ${fallback} at: ${fallbackLink || 'our website'}.
Be conversational, helpful, and focus on qualifying prospects and booking meetings.
Keep responses concise and natural (under 150 words).`;

    // Call OpenAI API
    const content = await callChatGPT(userMessage, {
      model,
      systemPrompt,
      maxTokens: 150,
      temperature: 0.7,
    });

    return {
      content,
      usedAPI: true,
      model,
    };

  } catch (error) {
    logger.error('Failed to generate AI response', {
      error: error.message,
      userMessage: userMessage.substring(0, 100),
    });

    throw error;
  }
};

/**
 * Test the OpenAI API connection
 * @returns {Promise<{success: boolean, message: string, model?: string}>} Test result
 */
const testConnection = async () => {
  logger.info('Testing OpenAI API connection...');

  try {
    if (!isConfigured()) {
      return {
        success: false,
        message: 'OpenAI API key not configured',
      };
    }

    // Make a simple test call
    const response = await callChatGPT('Hello', {
      model: 'gpt-3.5-turbo',
      systemPrompt: 'You are a helpful assistant.',
      maxTokens: 10,
      temperature: 0.7,
    });

    logger.info('OpenAI API connection test successful');

    return {
      success: true,
      message: 'Connected to OpenAI API successfully',
      model: 'gpt-3.5-turbo',
    };

  } catch (error) {
    logger.error('OpenAI API connection test failed', {
      error: error.message,
    });

    return {
      success: false,
      message: `OpenAI API connection failed: ${error.message}`,
    };
  }
};

/**
 * Get OpenAI configuration status
 * @returns {Object} Configuration status
 */
const getStatus = () => {
  const isConfiguredFlag = isConfigured();
  const apiKey = process.env.OPENAI_API_KEY;

  return {
    configured: isConfiguredFlag,
    apiKeyLength: apiKey ? apiKey.length : 0,
    apiKeyPrefix: apiKey ? apiKey.substring(0, 10) : null,
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
  };
};

module.exports = {
  callChatGPT,
  generateAIResponse,
  testConnection,
  getStatus,
  isConfigured,
};
