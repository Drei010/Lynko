/**
 * Validation Middleware
 * Request validation using Joi
 */

const Joi = require('joi');

/**
 * Validation middleware factory
 * Creates middleware that validates request data against a Joi schema
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorDetails,
      });
    }

    // Replace the request property with the validated and sanitized data
    req[property] = value;
    next();
  };
};

/**
 * Validation Schemas
 */
const schemas = {
  // User registration validation
  register: Joi.object({
    email: Joi.string()
      .email()
      .max(255)
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'string.max': 'Email must not exceed 255 characters',
        'any.required': 'Email is required',
      }),
    password: Joi.string()
      .min(8)
      .max(128)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'))
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must not exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
        'any.required': 'Password is required',
      }),
  }),

  // User login validation
  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required',
      }),
  }),

  // Conversation creation validation
  createConversation: Joi.object({
    title: Joi.string()
      .min(1)
      .max(255)
      .required()
      .messages({
        'string.min': 'Title must not be empty',
        'string.max': 'Title must not exceed 255 characters',
        'any.required': 'Title is required',
      }),
    context: Joi.string()
      .max(5000)
      .allow('')
      .messages({
        'string.max': 'Context must not exceed 5000 characters',
      }),
    ai_model: Joi.string()
      .valid('gpt-3.5-turbo', 'gpt-4', 'claude-instant-1', 'claude-2', 'gemini-pro')
      .required()
      .messages({
        'any.only': 'AI model must be one of: gpt-3.5-turbo, gpt-4, claude-instant-1, claude-2, gemini-pro',
        'any.required': 'AI model is required',
      }),
  }),

  // Message creation validation
  createMessage: Joi.object({
    content: Joi.string()
      .min(1)
      .max(10000)
      .required()
      .messages({
        'string.min': 'Message content must not be empty',
        'string.max': 'Message content must not exceed 10000 characters',
        'any.required': 'Message content is required',
      }),
  }),

  // URL parameter validation for conversation ID
  conversationId: Joi.object({
    id: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        'number.base': 'Conversation ID must be a number',
        'number.integer': 'Conversation ID must be an integer',
        'number.positive': 'Conversation ID must be a positive number',
        'any.required': 'Conversation ID is required',
      }),
  }),
};

module.exports = {
  validate,
  schemas,
};
