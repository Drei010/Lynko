# Lynko - AI-Powered LinkedIn Conversation Automation

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

Lynko is a cutting-edge SaaS platform that empowers Sales Development Representatives (SDRs) to automate personalized LinkedIn conversations at scale. The platform uses AI to handle entire conversation flows, qualifying prospects and booking meetings autonomously while maintaining a human-like, personalized touch.

## 🚀 Quick Start

### Run the entire application with one command:

```bash
bash start.sh
```

This will:
1. Install any missing dependencies
2. Start the backend API on port 3001
3. Start the frontend on port 5000
4. Handle database gracefully (chatbot works without database)

### What you'll see:

- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:3001
- **Chatbot**: Works immediately without login

## ✨ Features

### Core Functionality
- **AI-Powered Conversations**: Automatically handle personalized LinkedIn conversations
- **No Authentication Required**: Access chatbot immediately without signup/login
- **Prospect Qualification**: Intelligently qualify leads and determine their interest level
- **Meeting Booking**: Seamlessly book meetings with interested prospects
- **Scale at Speed**: Handle multiple conversations simultaneously without losing personalization

### Platform Features
- **Prompt Builder**: Create and customize AI conversation prompts
- **Chatbot Testing**: Test and refine your AI conversation flows with configurable parameters
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Optimized for desktop and mobile experiences
- **Dark Mode**: Professional dark theme with smooth transitions

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type safety and modern development
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **TanStack Query** for server state management
- **React Hook Form** with validation

### Backend
- **Node.js 18+** with Express.js
- **PostgreSQL** for data storage (optional - chatbot works without it)
- **JWT Authentication** (available but not required for chatbot)
- **bcryptjs** for password hashing
- **Joi** for request validation

### UI & Styling
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling
- **Lucide React** for icons
- **Next Themes** for dark mode support

### Development Tools
- **ESLint** for code linting
- **PostCSS** with Autoprefixer
- **TypeScript** for type checking

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL 12+ (optional - for auth features)
- npm or yarn package manager

### Option 1: Quick Start (Recommended)

```bash
# Clone the repository
git clone https://github.com/Drei010/Lynko.git
cd Lynko

# Run everything with one command
bash start.sh
```

### Option 2: Manual Setup

1. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd backend && npm install && cd ..
   ```

2. **Set up environment variables (optional)**
   ```bash
   # Copy environment template
   cp backend/env.example backend/.env

   # Edit backend/.env with your settings if needed
   ```

3. **Set up PostgreSQL database (optional)**
   ```bash
   # Create database
   createdb lynko_db

   # Run migrations
   cd backend && npm run migrate && cd ..
   ```

4. **Start the servers**
   ```bash
   # Start backend (in one terminal)
   cd backend && npm start

   # Start frontend (in another terminal)
   npm run dev
   ```

## 🤖 OpenAI Integration (Optional)

### Getting Your OpenAI API Key

1. **Sign up for OpenAI**: Go to [https://platform.openai.com/signup](https://platform.openai.com/signup)
2. **Navigate to API Keys**: Once logged in, go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
3. **Create New Key**: Click "Create new secret key" and copy the key (you won't be able to see it again!)

### Configure Your Environment

1. **Add to Replit Secrets**: 
   - Open the Secrets tool in Replit (lock icon in the sidebar)
   - Add a new secret with key: `OPENAI_API_KEY`
   - Paste your OpenAI API key as the value
2. **Restart the application** using `bash start.sh`

### Pricing & Free Tier

- OpenAI offers **$5 in free credits** for new accounts
- GPT-3.5-turbo costs approximately **$0.002 per 1,000 tokens**
- Each conversation typically uses 100-300 tokens
- Your $5 credit = ~2,500 conversations

### Testing

After adding your API key:
1. Restart the backend workflow
2. Visit `/api/chatbot/health` to verify OpenAI is configured
3. Test the chatbot - it should now use real ChatGPT responses!

Without OpenAI, the chatbot uses intelligent rule-based responses.

## 📁 Project Structure

```
Lynko/
├── src/                      # Frontend source code
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui component library
│   │   ├── Navigation.tsx  # Main navigation component
│   │   └── HeroVisual.tsx  # Landing page hero visual
│   ├── pages/              # Route pages
│   │   ├── Landing.tsx     # Home page
│   │   ├── PromptBuilder.tsx # AI prompt configuration
│   │   ├── ChatbotTest.tsx # Main chatbot interface
│   │   └── NotFound.tsx    # 404 page
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── services/           # API service layer
│   └── main.tsx            # Application entry point
├── backend/                 # Backend API
│   ├── config/             # Configuration files
│   │   ├── database.js     # Database connection
│   │   └── index.js        # App configuration
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── chatbotController.js
│   │   ├── conversationController.js
│   │   └── messageController.js
│   ├── database/           # Database schema
│   │   └── schema.sql
│   ├── middleware/         # Express middleware
│   │   ├── auth.js         # JWT authentication
│   │   └── validation.js   # Request validation
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── chatbot.js
│   │   ├── conversations.js
│   │   └── messages.js
│   ├── scripts/            # Utility scripts
│   │   └── migrate.js
│   └── server.js           # Main server file
├── public/                 # Static assets
├── start.sh                # Single-command startup script
└── package.json           # Dependencies and scripts
```

## 📚 Documentation

All documentation is consolidated in this README file for easy reference.

## 🚀 API Endpoints

### Chatbot Routes (No Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chatbot/chat` | Send message to chatbot |
| GET | `/api/chatbot/health` | Chatbot health check |

### Authentication Routes (Optional)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get current user profile |

### Conversation Routes (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/conversations` | Create a new conversation |
| GET | `/api/conversations` | Get all user conversations |
| GET | `/api/conversations/:id` | Get specific conversation |
| PUT | `/api/conversations/:id` | Update conversation |
| DELETE | `/api/conversations/:id` | Delete conversation |

### Message Routes (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/conversations/:id/messages` | Send message and get AI response |
| GET | `/api/conversations/:id/messages` | Get conversation messages |
| DELETE | `/api/messages/:id` | Delete a message |

## 🔐 Environment Variables

### Backend Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DB_HOST` | Database host | No | localhost |
| `DB_PORT` | Database port | No | 5432 |
| `DB_NAME` | Database name | No | lynko_db |
| `DB_USER` | Database user | No | postgres |
| `DB_PASSWORD` | Database password | No | - |
| `DATABASE_URL` | Full database URL | No | - |
| `JWT_SECRET` | JWT signing secret | No | - |
| `JWT_EXPIRES_IN` | JWT expiration | No | 7d |
| `PORT` | Server port | No | 3001 |
| `NODE_ENV` | Environment | No | development |
| `CORS_ORIGIN` | CORS origin | No | http://localhost:5000 |
| `OPENAI_API_KEY` | OpenAI API key | No | - |

## 🗄️ Database Schema

### Tables

#### `users`
- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR(255) UNIQUE NOT NULL)
- `password` (TEXT NOT NULL)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### `conversations`
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `title` (VARCHAR(255) NOT NULL)
- `context` (TEXT)
- `ai_model` (VARCHAR(100) NOT NULL)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### `messages`
- `id` (SERIAL PRIMARY KEY)
- `conversation_id` (INTEGER REFERENCES conversations)
- `role` (VARCHAR(20) NOT NULL) - 'user' or 'assistant'
- `content` (TEXT NOT NULL)
- `created_at` (TIMESTAMP)

## 🔧 Development

### Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
cd backend
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm run migrate      # Run database migrations
npm test             # Run tests
```

### Development Configuration

- Frontend runs on `0.0.0.0:5000` (accessible through Replit webview)
- Backend runs on `localhost:3001`
- Vite proxy forwards `/api` requests to backend
- Hot Module Replacement (HMR) enabled for fast development

## 🚀 Deployment on Replit

### Automatic Deployment

The application is configured for Replit's autoscale deployment:

1. **Build Command**: `npm run build`
2. **Run Command**: `vite preview`
3. **Port**: 5000

### Environment Setup

1. Add required secrets in Replit Secrets:
   - `OPENAI_API_KEY` (optional)
   - Database credentials if using PostgreSQL
2. Click "Deploy" in Replit
3. Your app will be live at your Replit deployment URL

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Joi schema validation on all endpoints
- **Security Headers**: Helmet.js protection
- **Password Hashing**: bcryptjs with configurable rounds
- **CORS Protection**: Configurable origins
- **SQL Injection Protection**: Parameterized queries

## 🧪 Testing

### Test the Chatbot

1. Visit `http://localhost:5000`
2. Click "Try Demo" or navigate to chatbot
3. Configure test parameters (optional):
   - Product name
   - Goals and links
   - Fallback options
4. Start chatting!

### Test API Manually

```bash
# Health check
curl http://localhost:3001/health

# Chatbot endpoint
curl -X POST http://localhost:3001/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "model": "gpt-3.5-turbo"}'
```

## 🚨 Troubleshooting

### Database Connection Failed

- **Solution**: The chatbot works without database! This is normal if you haven't set up PostgreSQL
- Only needed for: User authentication, conversation history
- Not needed for: Basic chatbot functionality

### CORS Errors

- Verify `CORS_ORIGIN` in backend/.env matches your frontend URL
- Default is `http://localhost:5000`

### OpenAI Not Working

- Check that `OPENAI_API_KEY` is set in Replit Secrets or backend/.env
- Verify you have API credits remaining
- The app will fall back to rule-based responses automatically

### Port Already in Use

```bash
# Kill process on port 5000 (frontend)
kill -9 $(lsof -ti:5000)

# Kill process on port 3001 (backend)
kill -9 $(lsof -ti:3001)
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

- **Documentation**: This README
- **Issues**: Create a GitHub issue
- **Email**: support@lynko.ai

## 🔮 Future Roadmap

- [ ] Advanced conversation analytics
- [ ] Integration with CRM systems
- [ ] Multi-language support
- [ ] Advanced AI model selection
- [ ] Team collaboration features
- [ ] API for third-party integrations
- [ ] Voice conversation support
- [ ] Mobile app

---

**Built with ❤️ by the Lynko Team**

*Empowering SDRs to close more deals through AI-powered conversations*