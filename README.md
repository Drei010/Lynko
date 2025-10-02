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

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Drei010/Lynko.git
   cd Lynko
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000` to view the application

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
