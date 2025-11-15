#!/bin/bash

# ============================================================================
# Help Command for Lynko
# Shows available commands and usage
# ============================================================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_header() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_command() {
    echo -e "${GREEN}$1${NC}"
    echo "  $2"
    echo ""
}

print_header "🚀 Lynko - Quick Commands"

echo "START SERVICES:"
print_command "./start.sh" "Start both frontend and backend with one command"
print_command "./start.sh 8000 8001" "Start on custom ports (backend 8000, frontend 8001)"
echo ""

echo "BACKEND COMMANDS:"
print_command "cd backend && npm install" "Install backend dependencies"
print_command "cd backend && npm start" "Start backend server (port 5000)"
print_command "cd backend && npm run test:openai" "Test OpenAI API connection"
print_command "cd backend && npm run migrate" "Run database migrations"
echo ""

echo "FRONTEND COMMANDS:"
print_command "npm install" "Install frontend dependencies"
print_command "npm run dev" "Start frontend dev server (port 3000)"
print_command "npm run build" "Build for production"
print_command "npm run preview" "Preview production build"
echo ""

echo "USEFUL LINKS:"
echo -e "${GREEN}Frontend:${NC}        http://localhost:3000"
echo -e "${GREEN}Backend API:${NC}     http://localhost:5000"
echo -e "${GREEN}Health Check:${NC}    http://localhost:5000/health"
echo ""

echo "DOCUMENTATION:"
echo -e "${BLUE}Getting Started:${NC}   QUICKSTART.md"
echo -e "${BLUE}Backend Setup:${NC}     backend/README.md"
echo -e "${BLUE}OpenAI Config:${NC}     backend/CHATGPT_SETUP.md"
echo -e "${BLUE}Production:${NC}        PRODUCTION_DEPLOYMENT.md"
echo ""

echo "LOGS:"
echo -e "${YELLOW}Backend:${NC}         tail -f /tmp/lynko-backend.log"
echo -e "${YELLOW}Frontend:${NC}        tail -f /tmp/lynko-frontend.log"
echo ""
