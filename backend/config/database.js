/**
 * Database Configuration
 * PostgreSQL connection configuration for Lynko backend
 * Database is OPTIONAL - chatbot works without it
 */

const { Pool } = require('pg');
require('dotenv').config();

// Check if database is configured
const isDatabaseConfigured = process.env.DATABASE_URL || 
  (process.env.DB_HOST && process.env.DB_PASSWORD);

let pool = null;

// Only create pool if database is configured
if (isDatabaseConfigured) {
  // Database configuration
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'lynko_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  };

  // Use DATABASE_URL if provided (for production environments like Heroku, Supabase)
  if (process.env.DATABASE_URL) {
    dbConfig.connectionString = process.env.DATABASE_URL;
    delete dbConfig.host;
    delete dbConfig.port;
    delete dbConfig.database;
    delete dbConfig.user;
    delete dbConfig.password;
  }

  // Create the connection pool
  pool = new Pool(dbConfig);

  // Handle pool errors gracefully (don't exit)
  pool.on('error', (err) => {
    console.error('⚠️  Database pool error:', err.message);
  });
} else {
  console.log('ℹ️  Database not configured - chatbot will work without database features');
}

// Test database connection (returns true/false, doesn't exit on failure)
const testConnection = async () => {
  if (!pool) {
    return false;
  }
  
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error('⚠️  Database connection failed:', error.message);
    console.error('   The chatbot will work without database features');
    return false;
  }
};

// Database query helper function
const query = async (text, params) => {
  if (!pool) {
    throw new Error('Database not configured. Set DATABASE_URL or DB_* environment variables.');
  }
  
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Transaction helper function
const getClient = async () => {
  if (!pool) {
    throw new Error('Database not configured. Set DATABASE_URL or DB_* environment variables.');
  }
  return await pool.connect();
};

module.exports = {
  pool,
  query,
  getClient,
  testConnection,
};
