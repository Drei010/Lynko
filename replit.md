# Overview

This is a SaaS MVP application built with React, TypeScript, and Vite. The application provides a landing page and authentication system for "kakiyo" (also referred to as "Lynko" in the content), a platform that enables SDRs (Sales Development Representatives) to automate LinkedIn conversations using AI. The application features secure user registration and login with JWT token-based authentication.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and development server for fast builds and hot module replacement
- **React Router** for client-side routing with three main routes: landing page (`/`), authentication (`/auth`), and a 404 not-found page

## UI Component System
- **shadcn/ui** component library built on top of **Radix UI primitives** for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens defined in CSS variables
- **CVA (Class Variance Authority)** for managing component variants
- Dark mode support via **next-themes** package
- Components follow a modular architecture with all UI elements in `src/components/ui/`

## State Management & Data Fetching
- **TanStack Query (React Query)** for server state management and data fetching
- **React Hook Form** with **@hookform/resolvers** for form state management and validation
- Local state management using React hooks (useState, useEffect)

## Authentication Architecture
- JWT token-based authentication stored in localStorage
- Token persistence checked on component mount
- User credentials (email/password) validated client-side before submission
- Authentication state managed through local component state
- Backend integration expects POST requests to authentication endpoints

## Styling & Design System
- HSL color system defined in CSS custom properties for theme consistency
- Design tokens include primary, secondary, muted, accent, destructive color schemes
- Responsive design with mobile breakpoint at 768px
- Custom animations defined in Tailwind config (float animation for hero visual)
- Component path aliases configured via TypeScript for clean imports (@/components, @/lib, @/hooks)

## Code Quality & Tooling
- **ESLint** with TypeScript plugin for code linting
- **PostCSS** with Autoprefixer for CSS processing
- Strict TypeScript configuration disabled (`strict: false`) to allow gradual typing
- React Fast Refresh for development hot reloading via @vitejs/plugin-react-swc

## Project Structure
```
src/
├── components/      # Reusable UI components
│   ├── ui/         # shadcn/ui component library
│   ├── Navigation.tsx
│   └── HeroVisual.tsx
├── pages/          # Route pages
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
└── main.tsx        # Application entry point
```

## Development Considerations
- Server configured to run on `0.0.0.0:5000` with strict port enforcement
- Component tagging enabled in development mode via lovable-tagger
- TypeScript compiler configured for ES2020 target with bundler module resolution
- Unused variables and parameters linting disabled for development flexibility

## Replit Configuration
- **Vite Configuration**: Configured for Replit's proxy environment with `allowedHosts: true` to allow proxy access
- **Development Server**: Runs on `0.0.0.0:5000` to be accessible through Replit's webview
- **Hot Module Replacement (HMR)**: Working correctly without explicit configuration - Vite auto-detects the proxy environment
- **Workflow**: "Start application" runs `npm run dev` and serves on port 5000 with webview output
- **Deployment**: Configured to use `npm run build` for build and `npm run preview` for production preview

# External Dependencies

## UI & Styling
- **@radix-ui/** - Complete suite of unstyled, accessible UI primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, select, tabs, toast, tooltip, etc.)
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Utility for conditional CSS classes
- **next-themes** - Theme management (light/dark mode)
- **lucide-react** - Icon library

## Form Management
- **react-hook-form** - Form state and validation
- **@hookform/resolvers** - Validation schema resolvers for react-hook-form

## Data Fetching & State
- **@tanstack/react-query** - Server state management and data fetching

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

## Backend Integration
The application expects a backend API with the following endpoints:
- User registration endpoint (POST)
- User login endpoint (POST)
- JWT token-based authentication flow

Note: While the codebase doesn't explicitly show database integration, the authentication flow suggests a backend API that would typically use a database for user storage. The application is prepared to integrate with database solutions as needed.