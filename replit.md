# Overview

This is a Lynko AI chatbot application built with React, TypeScript, and Vite. The application provides an AI-powered conversational interface for LinkedIn automation and prospect qualification. Users can interact with the chatbot without any login requirements - the focus is purely on demonstrating the conversational AI capabilities.

## Recent Changes (October 2025)
- **Removed Authentication**: All login/signup functionality has been removed to focus on the chatbot
- **Simplified Backend**: Backend API is available but the chatbot works independently with mock AI responses
- **Direct Access**: Users can access the chatbot immediately from the landing page without any barriers
- **Configuration Panel**: Test configuration panel allows users to customize chatbot behavior (product, goals, fallback options)

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and development server for fast builds and hot module replacement
- **React Router** for client-side routing with routes: landing page (`/`), prompt builder (`/prompt-builder`), and chatbot (`/chatbot`)

## UI Component System
- **shadcn/ui** component library built on top of **Radix UI primitives** for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens defined in CSS variables
- **CVA (Class Variance Authority)** for managing component variants
- Dark mode support via **next-themes** package
- Components follow a modular architecture with all UI elements in `src/components/ui/`

## State Management & Data Fetching
- **TanStack Query (React Query)** for server state management
- **React Hook Form** with **@hookform/resolvers** for form state management
- Local state management using React hooks (useState, useEffect)

## Chatbot Architecture
- **No Authentication Required**: Chatbot is accessible to all users immediately
- **Mock AI Responses**: Built-in intelligent response generator based on user input
- **Configurable Parameters**: Users can customize product name, goals, and fallback options
- **Real-time Conversation**: Simulates typing delay for realistic AI interaction
- **Message History**: Maintains conversation context within the session

## Styling & Design System
- HSL color system defined in CSS custom properties for theme consistency
- Design tokens include primary, secondary, muted, accent, destructive color schemes
- Responsive design with mobile breakpoint at 768px
- Custom animations defined in Tailwind config
- Component path aliases configured via TypeScript for clean imports (@/components, @/lib, @/hooks)

## Code Quality & Tooling
- **ESLint** with TypeScript plugin for code linting
- **PostCSS** with Autoprefixer for CSS processing
- React Fast Refresh for development hot reloading via @vitejs/plugin-react-swc

## Project Structure
```
src/
├── components/      # Reusable UI components
│   ├── ui/         # shadcn/ui component library
│   ├── Navigation.tsx
│   └── HeroVisual.tsx
├── pages/          # Route pages
│   ├── Landing.tsx
│   ├── PromptBuilder.tsx
│   ├── ChatbotTest.tsx (main chatbot interface)
│   └── NotFound.tsx
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── services/       # API service (available but not required for chatbot)
└── main.tsx        # Application entry point
```

## Development Considerations
- Server configured to run on `0.0.0.0:5000` with strict port enforcement
- Backend API runs on port 3001 (localhost only)
- Frontend uses Vite proxy to forward /api requests to backend
- TypeScript compiler configured for ES2020 target with bundler module resolution

## Replit Configuration
- **Vite Configuration**: Configured for Replit's proxy environment with `allowedHosts: true` to allow proxy access
- **Development Server**: Frontend runs on `0.0.0.0:5000` to be accessible through Replit's webview
- **Backend Server**: Express.js backend runs on `localhost:3001` (optional, chatbot works independently)
- **Hot Module Replacement (HMR)**: Working correctly - Vite auto-detects the proxy environment
- **Workflows**: 
  - "Frontend" runs `npm run dev` on port 5000 with webview output
  - "Backend API" runs `cd backend && npm start` on port 3001 with console output
- **Deployment**: Configured to use autoscale deployment with `npm run build` for build and vite preview for serving

## Database
- PostgreSQL database configured and available
- Backend has database schema for users, conversations, and messages
- Currently not used by the simplified chatbot (no authentication required)

# External Dependencies

## UI & Styling
- **@radix-ui/** - Complete suite of unstyled, accessible UI primitives
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Utility for conditional CSS classes
- **next-themes** - Theme management (light/dark mode)
- **lucide-react** - Icon library

## Form Management
- **react-hook-form** - Form state and validation
- **@hookform/resolvers** - Validation schema resolvers

## Data Fetching & State
- **@tanstack/react-query** - Server state management

## Additional UI Components
- **cmdk** - Command menu component
- **embla-carousel-react** - Carousel/slider functionality
- **input-otp** - OTP input component
- **react-day-picker** - Date picker component
- **date-fns** - Date utility library
- **sonner** - Toast notification system
- **vaul** - Drawer component

## Build Tools
- **vite** - Build tool and development server
- **@vitejs/plugin-react-swc** - React plugin with SWC compiler
- **typescript** - Type checking
- **eslint** - Code linting
- **autoprefixer** - CSS vendor prefixing

## Backend (Optional)
- **Express.js** - Backend server framework
- **PostgreSQL** - Database (via Neon on Replit)
- **JWT** - Token-based authentication (available but not currently used)
- **bcryptjs** - Password hashing
- **Joi** - Request validation

# Key Features

## 1. Chatbot Interface
The main feature of the application is the AI chatbot that:
- Responds intelligently to user messages
- Understands context about products, meetings, and inquiries
- Can be configured with custom product names, goals, and fallback options
- Simulates realistic AI conversation with typing delays
- Maintains conversation history during the session

## 2. No Authentication Required
- Users can access the chatbot immediately
- No signup or login needed
- Focus on demonstrating AI capabilities

## 3. Configuration Panel
- Product selection
- Custom goal setting with links
- Fallback options for different user responses
- Real-time configuration updates

## 4. Professional UI
- Clean, modern dark theme
- Responsive design
- Smooth animations and transitions
- Accessible components from Radix UI
