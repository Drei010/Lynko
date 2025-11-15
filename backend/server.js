/**
 * Lynko SaaS MVP Backend Server
 * Production-ready Express.js server with PostgreSQL database
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
require('dotenv').config();

const config = require('./config');
const { testConnection } = require('./config/database');

// Import routes
const chatbotRoutes = require('./routes/chatbot');

const app = express();

// Trust proxy - required for Replit and rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS configuration - allow extension and web app
app.use(cors({
  origin: [
    config.cors.origin,
    'chrome-extension://*',
    'moz-extension://*'
  ],
  credentials: true,
}));

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Lynko Backend is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API routes
app.use('/api/chatbot', chatbotRoutes);  // Chatbot routes (no auth required)

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  // Don't leak error details in production
  const message = config.nodeEnv === 'production' 
    ? 'Internal server error' 
    : err.message;
  
  res.status(err.status || 500).json({
    success: false,
    message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
const startServer = async () => {
  try {
    // Try database connection, but don't fail if unavailable
    let dbConnected = false;
    try {
      dbConnected = await testConnection();
    } catch (dbError) {
      console.log('⚠️  Database not available - chatbot will work without database features');
      console.log('   (This is normal if you haven\'t set up PostgreSQL)');
    }
    
    // Start the server (regardless of database connection)
    // Listen on all interfaces - can be accessed via localhost, 127.0.0.1, or 0.0.0.0
    const server = app.listen(config.port, () => {
      console.log('🚀 Lynko Chatbot Backend Started');
      console.log(`📍 Environment: ${config.nodeEnv}`);
      console.log(`🌐 Server running on port ${config.port}`);
      console.log(`🔗 Health check: http://localhost:${config.port}/health`);
      console.log(`🤖 Chatbot API:`);
      console.log(`   POST /api/chatbot/chat - Send message to chatbot`);
      console.log(`   GET  /api/chatbot/health - Chatbot health check`);
      if (dbConnected) {
        console.log(`📊 Database: Connected`);
      } else {
        console.log(`📊 Database: Not connected (chatbot will work without it)`);
      }
    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${config.port} is already in use`);
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
