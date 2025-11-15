# Lynko - AI-Powered LinkedIn Conversation Automation

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

Lynko is a cutting-edge SaaS platform that empowers Sales Development Representatives (SDRs) to automate personalized LinkedIn conversations at scale. The platform uses AI to handle entire conversation flows, qualifying prospects and booking meetings autonomously while maintaining a human-like, personalized touch.

## 🚀 Quick Start

### Run everything with one command:

```bash
./start.sh
```

**That's it!** The script automatically:
- ✅ Checks Node.js and npm
- ✅ Installs dependencies (if needed)
- ✅ Creates environment files (if needed)
- ✅ Starts backend API (port 5000)
- ✅ Starts frontend (port 3000)
- ✅ Runs health checks

### Access the application:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/health

**For detailed setup instructions**, see [QUICKSTART.md](./QUICKSTART.md)

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
- **Node.js 18+** with Express.js for REST API
- **PostgreSQL** for data persistence (conversations and messages)
- **OpenAI API** for AI-powered chat responses
- **Axios** for HTTP requests
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Express Rate Limit** for API rate limiting
- **Joi** for request validation
- **dotenv** for environment configuration

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
- **Node.js 18+** ([Download](https://nodejs.org/))
- **PostgreSQL 12+** ([Download](https://www.postgresql.org/))
- **OpenAI API Key** ([Get here](https://platform.openai.com/api-keys))
- Git

### ⚡ Quick Start (Recommended)

The easiest way to get started:

```bash
# Clone the repository
git clone https://github.com/Drei010/Lynko.git
cd Lynko

# Run everything with one command
./start.sh
```

Then open http://localhost:3000 in your browser. **That's it!**

### Manual Setup

If you prefer to set up manually:

1. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd backend && npm install && cd ..
   ```

2. **Set up environment**
   ```bash
   # Copy backend template
   cp backend/env.example backend/.env
   ```

3. **Configure your OpenAI API key**
   ```bash
   # Edit backend/.env
   nano backend/.env
   ```
   
   Find and update:
   ```bash
   OPENAI_API_KEY=sk-your-actual-key-here
   DATABASE_URL=postgresql://user:password@localhost:5432/lynko_dev
   ```

4. **Create database** (optional - chatbot works without it)
   ```bash
   createdb lynko_dev
   cd backend && npm run migrate && cd ..
   ```

5. **Start the servers**
   ```bash
   # Terminal 1: Backend
   cd backend && npm start

   # Terminal 2: Frontend
   npm run dev
   ```

## 🤖 OpenAI Integration

### Setup OpenAI API

1. **Get your API key**: https://platform.openai.com/api-keys
2. **Add to backend/.env**:
   ```bash
   OPENAI_API_KEY=sk-proj-your-key-here
   OPENAI_MODEL=gpt-3.5-turbo
   ```
3. **Test the connection**:
   ```bash
   cd backend && npm run test:openai
   ```

### Pricing & Free Tier
````
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

### Chatbot Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chatbot/chat` | Send message to chatbot |
| GET | `/api/chatbot/health` | Chatbot health check |

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