/**
 * Authentication Routes
 * Handles user registration, login, and profile management
 */

const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

// POST /api/auth/register - Register a new user
router.post('/register', validate(schemas.register), register);

// POST /api/auth/login - Login user
router.post('/login', validate(schemas.login), login);

// GET /api/auth/profile - Get current user profile (protected)
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
