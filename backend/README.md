# Lynko Backend - Production-Ready Express.js API

A production-ready Express.js backend for the Lynko SaaS MVP chatbot application. Built with modern JavaScript, PostgreSQL, and comprehensive security features.

## 🚀 Features

- **JWT Authentication** - Secure user registration and login
- **PostgreSQL Database** - Robust data storage with proper relationships
- **AI Chatbot Integration** - Mock AI responses with extensible architecture
- **Rate Limiting** - Protection against abuse and DoS attacks
- **Input Validation** - Comprehensive request validation using Joi
- **Security Headers** - Helmet.js for security best practices
- **Error Handling** - Centralized error handling with proper HTTP status codes
- **Database Migrations** - Automated database schema management
- **Environment Configuration** - Flexible configuration for different environments

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL with pg driver
- **Authentication**: JWT with bcryptjs for password hashing
- **Validation**: Joi for request validation
- **Security**: Helmet.js, CORS, Rate limiting
- **Environment**: dotenv for configuration

## 📦 Installation

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 12 or higher
- npm or yarn package manager

### Setup Instructions

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=lynko_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb lynko_db
   
   # Run migrations
   npm run migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

### Tables

#### `users`
- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR(255) UNIQUE NOT NULL)
- `password` (TEXT NOT NULL)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

#### `conversations`
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users(id))
- `title` (VARCHAR(255) NOT NULL)
- `context` (TEXT)
- `ai_model` (VARCHAR(100) NOT NULL)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

#### `messages`
- `id` (SERIAL PRIMARY KEY)
- `conversation_id` (INTEGER REFERENCES conversations(id))
- `role` (VARCHAR(20) NOT NULL) - 'user' or 'assistant'
- `content` (TEXT NOT NULL)
- `created_at` (TIMESTAMP WITH TIME ZONE)

## 📚 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get current user profile | Yes |

### Conversation Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/conversations` | Create a new conversation | Yes |
| GET | `/api/conversations` | Get all user conversations | Yes |
| GET | `/api/conversations/:id` | Get specific conversation | Yes |
| PUT | `/api/conversations/:id` | Update conversation | Yes |
| DELETE | `/api/conversations/:id` | Delete conversation | Yes |

### Message Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/conversations/:id/messages` | Send message and get AI response | Yes |
| GET | `/api/conversations/:id/messages` | Get conversation messages | Yes |
| DELETE | `/api/messages/:id` | Delete a message | Yes |

### Utility Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check endpoint | No |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create Conversation
```bash
POST /api/conversations
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Tech Support Chat",
  "context": "Help me debug a Node.js application",
  "ai_model": "gpt-3.5-turbo"
}
```

### Send Message
```bash
POST /api/conversations/1/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "How do I fix a memory leak in my Node.js app?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent and AI response received",
  "data": {
    "user_message": {
      "id": 1,
      "role": "user",
      "content": "How do I fix a memory leak in my Node.js app?",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "ai_message": {
      "id": 2,
      "role": "assistant",
      "content": "Based on your context: \"Help me debug a Node.js application\" and your question: \"How do I fix a memory leak in my Node.js app?\", I can help you with that. GPT-3.5-turbo suggests focusing on the core aspects of your query.",
      "created_at": "2024-01-01T00:00:01.000Z"
    }
  }
}
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secure-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📊 Monitoring & Logging

The application includes structured logging and health check endpoints for monitoring:

- **Health Check**: `GET /health`
- **Structured Logging**: JSON format with timestamps
- **Error Tracking**: Centralized error handling

## 🔧 Development

### Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run migrate      # Run database migrations
npm test             # Run tests
npm run lint         # Run ESLint
```

### Project Structure

```
backend/
├── config/              # Configuration files
│   ├── database.js      # Database connection
│   └── index.js         # App configuration
├── controllers/         # Route controllers
│   ├── authController.js
│   ├── conversationController.js
│   └── messageController.js
├── database/            # Database files
│   └── schema.sql       # Database schema
├── middleware/          # Express middleware
│   ├── auth.js          # JWT authentication
│   └── validation.js    # Request validation
├── routes/              # API routes
│   ├── auth.js
│   ├── conversations.js
│   └── messages.js
├── scripts/             # Utility scripts
│   └── migrate.js       # Database migration
├── utils/               # Utility functions
│   └── logger.js        # Logging utility
├── server.js            # Main server file
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@lynko.ai or create an issue in the repository.

---

**Built with ❤️ by the Lynko Team**

*Production-ready Express.js backend for AI-powered conversations*
