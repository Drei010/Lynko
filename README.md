# Lynko - AI-Powered LinkedIn Conversation Automation

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

Lynko is a cutting-edge SaaS platform that empowers Sales Development Representatives (SDRs) to automate personalized LinkedIn conversations at scale. The platform uses AI to handle entire conversation flows, qualifying prospects and booking meetings autonomously while maintaining a human-like, personalized touch.

## 🚀 Features

### Core Functionality
- **AI-Powered Conversations**: Automatically handle personalized LinkedIn conversations
- **Prospect Qualification**: Intelligently qualify leads and determine their interest level
- **Meeting Booking**: Seamlessly book meetings with interested prospects
- **Scale at Speed**: Handle multiple conversations simultaneously without losing personalization

### Platform Features
- **Prompt Builder**: Create and customize AI conversation prompts
- **Chatbot Testing**: Test and refine your AI conversation flows
- **Secure Authentication**: JWT-based user authentication and registration
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Optimized for desktop and mobile experiences

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type safety and modern development
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **TanStack Query** for server state management
- **React Hook Form** with validation

### UI & Styling
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling
- **Lucide React** for icons
- **Next Themes** for dark mode support

### Development Tools
- **ESLint** for code linting
- **PostCSS** with Autoprefixer
- **TypeScript** for type checking

## 📦 Installation & Local Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- PostgreSQL (v12 or higher)
- Git

### Complete Local Setup Guide

#### Step 1: Clone the Repository
```bash
git clone https://github.com/Drei010/Lynko.git
cd Lynko
```

#### Step 2: Database Setup
1. **Install PostgreSQL** (if not already installed):
   ```bash
   # Ubuntu/Debian
   sudo apt update && sudo apt install -y postgresql postgresql-contrib
   
   # macOS (using Homebrew)
   brew install postgresql
   
   # Start PostgreSQL service
   sudo systemctl start postgresql  # Linux
   brew services start postgresql   # macOS
   ```

2. **Create Database and User**:
   ```bash
   # Access PostgreSQL as postgres user
   sudo -u postgres psql
   
   # Create database
   CREATE DATABASE lynko_db;
   
   # Create user with password
   CREATE USER lynko_user WITH ENCRYPTED PASSWORD 'lynko_password123';
   
   # Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE lynko_db TO lynko_user;
   
   # Exit PostgreSQL
   \q
   ```

#### Step 3: Backend Setup
1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables** (edit `.env` file):
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=lynko_db
   DB_USER=lynko_user
   DB_PASSWORD=lynko_password123
   DATABASE_URL=postgresql://lynko_user:lynko_password123@localhost:5432/lynko_db
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_secure
   JWT_EXPIRES_IN=7d
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start the backend server**:
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ✅ Database connected successfully
   🚀 Lynko Backend Server Started
   🌐 Server running on port 5000
   ```

#### Step 4: Frontend Setup
1. **Open a new terminal** and navigate to the root directory:
   ```bash
   cd Lynko  # (from project root)
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend development server**:
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   VITE v5.4.19  ready in 434ms
   ➜  Local:   http://localhost:3000/
   ➜  Network: http://10.0.0.98:3000/
   ```

#### Step 5: Verify Installation
1. **Frontend**: Open http://localhost:3000 in your browser
2. **Backend Health Check**: Visit http://localhost:5000/health
3. **Expected Response**:
   ```json
   {
     "success": true,
     "message": "Lynko Backend is running",
     "timestamp": "2025-10-03T18:20:59.722Z",
     "environment": "development"
   }
   ```

### Running the Application

#### Development Mode
1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   npm run dev
   ```

#### Production Mode
1. **Build Frontend**:
   ```bash
   npm run build
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```

### API Endpoints
The backend provides the following API endpoints:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `POST /api/conversations` - Create conversation
- `GET /api/conversations` - Get user conversations
- `POST /api/conversations/:id/messages` - Send message
- `GET /api/conversations/:id/messages` - Get messages

### Troubleshooting

#### Common Issues
1. **Port 5000 already in use**:
   ```bash
   sudo lsof -ti:5000 | xargs sudo kill -9
   ```

2. **Database connection failed**:
   - Ensure PostgreSQL is running
   - Verify database credentials in `.env` file
   - Check if `lynko_db` database exists

3. **Frontend can't connect to backend**:
   - Ensure backend is running on port 5000
   - Check CORS configuration in backend `.env`

4. **Permission denied errors**:
   ```bash
   sudo chown -R $USER:$USER node_modules
   ```

### Application URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🏗️ Build & Deployment

### Development Build
```bash
npm run build:dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
Lynko/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui component library
│   │   ├── Navigation.tsx  # Main navigation component
│   │   └── HeroVisual.tsx  # Landing page hero visual
│   ├── pages/              # Route pages
│   │   ├── Landing.tsx     # Home page
│   │   ├── Auth.tsx        # Authentication page
│   │   ├── PromptBuilder.tsx # AI prompt configuration
│   │   ├── ChatbotTest.tsx # Conversation testing
│   │   └── NotFound.tsx    # 404 page
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── attached_assets/        # Project assets and documentation
└── package.json           # Dependencies and scripts
```

## 🎯 Key Pages

### Landing Page (`/`)
- Hero section showcasing the platform's value proposition
- Clear call-to-action for user registration
- Modern, responsive design with engaging visuals

### Authentication (`/auth`)
- Secure user registration and login
- JWT token-based authentication
- Form validation and error handling

### Prompt Builder (`/prompt-builder`)
- Configure AI conversation prompts
- Define conversation context and instructions
- Customize conversation goals and fallback actions

### Chatbot Test (`/chatbot-test`)
- Test and preview AI conversation flows
- Configure test parameters (product, goals, links)
- Real-time conversation simulation

## 🔧 Configuration

### Environment Variables
The application is configured to run on port 5000 with the following settings:
- Development server: `0.0.0.0:5000`
- Strict port enforcement enabled
- Proxy support for development environments

### Customization
- **Themes**: Modify color schemes in `src/index.css`
- **Components**: Add new UI components in `src/components/ui/`
- **Routes**: Add new pages in `src/pages/` and update `App.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@lynko.ai or create an issue in this repository.

## 🔮 Future Roadmap

- [ ] Advanced conversation analytics
- [ ] Integration with CRM systems
- [ ] Multi-language support
- [ ] Advanced AI model selection
- [ ] Team collaboration features
- [ ] API for third-party integrations

---

**Built with ❤️ by the Lynko Team**

*Empowering SDRs to close more deals through AI-powered conversations*
