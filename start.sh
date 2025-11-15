
#!/bin/bash

# ============================================================================
# Lynko Quickstart Script
# Starts both frontend and backend servers with a single command
# Usage: ./start.sh [backend-port] [frontend-port]
# Default: ./start.sh (uses 5000 for backend, 3000 for frontend)
# ============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
BACKEND_PORT=${1:-5000}
FRONTEND_PORT=${2:-3000}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Color output function
print_section() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# ============================================================================
# CLEANUP ON EXIT
# ============================================================================
cleanup() {
    echo ""
    print_section "Shutting Down"
    
    echo "Stopping backend and frontend processes..."
    
    # Kill all child processes
    jobs -p | xargs -r kill 2>/dev/null || true
    
    echo -e "${YELLOW}Services stopped.${NC}"
    exit 0
}

# Trap signals
trap cleanup SIGINT SIGTERM EXIT

# ============================================================================
# PREREQUISITE CHECKS
# ============================================================================
print_section "Checking Prerequisites"

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    echo "Install from: https://nodejs.org/ (v18+)"
    exit 1
fi
NODE_VERSION=$(node -v)
print_status "Node.js: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi
print_status "npm: $(npm -v)"

# ============================================================================
# BACKEND SETUP
# ============================================================================
print_section "Setting Up Backend"

cd "$SCRIPT_DIR/backend"

# Check if .env exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found in backend/"
    echo "Creating .env from env.example..."
    if [ -f "env.example" ]; then
        cp env.example .env
        print_status "Created .env from env.example"
        print_warning "⚠ Remember to update backend/.env with your actual values:"
        echo "   - DATABASE_URL (PostgreSQL connection string)"
        echo "   - OPENAI_API_KEY (your OpenAI API key)"
        echo ""
    else
        print_error "env.example not found"
        exit 1
    fi
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_status "Installing backend dependencies..."
    npm install
else
    print_status "Backend dependencies already installed"
fi

print_status "Backend directory: $SCRIPT_DIR/backend"
print_status "Backend will run on: http://localhost:$BACKEND_PORT"

# ============================================================================
# FRONTEND SETUP
# ============================================================================
print_section "Setting Up Frontend"

cd "$SCRIPT_DIR"

# Check if .env.development exists
if [ ! -f ".env.development" ]; then
    print_warning ".env.development not found"
    echo "Creating .env.development..."
    cat > .env.development << EOF
VITE_API_URL=http://localhost:$BACKEND_PORT/api
VITE_ENVIRONMENT=development
VITE_APP_VERSION=1.0.0-dev
EOF
    print_status "Created .env.development"
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
else
    print_status "Frontend dependencies already installed"
fi

print_status "Frontend directory: $SCRIPT_DIR"
print_status "Frontend will run on: http://localhost:$FRONTEND_PORT"

# ============================================================================
# START SERVICES
# ============================================================================
print_section "Starting Services"

# Start backend
echo -e "${BLUE}Starting backend on port $BACKEND_PORT...${NC}"
cd "$SCRIPT_DIR/backend"
PORT=$BACKEND_PORT npm start > /tmp/lynko-backend.log 2>&1 &
BACKEND_PID=$!
print_status "Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 2

# Check if backend is actually running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    print_error "Backend failed to start. Check the logs:"
    cat /tmp/lynko-backend.log
    exit 1
fi

# Start frontend
echo -e "${BLUE}Starting frontend on port $FRONTEND_PORT...${NC}"
cd "$SCRIPT_DIR"
PORT=$FRONTEND_PORT npm run dev > /tmp/lynko-frontend.log 2>&1 &
FRONTEND_PID=$!
print_status "Frontend started (PID: $FRONTEND_PID)"

# Wait a moment for frontend to start
sleep 2

# ============================================================================
# READY MESSAGE
# ============================================================================
print_section "🚀 Lynko is Running!"

echo ""
echo -e "${GREEN}Frontend URL:${NC}  http://localhost:$FRONTEND_PORT"
echo -e "${GREEN}Backend URL:${NC}   http://localhost:$BACKEND_PORT"
echo -e "${GREEN}API URL:${NC}       http://localhost:$BACKEND_PORT/api"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# ============================================================================
# HEALTH CHECKS
# ============================================================================
print_section "Running Health Checks"

# Function to check if service is running
check_health() {
    local url=$1
    local name=$2
    local max_attempts=10
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            print_status "$name is healthy"
            return 0
        fi
        echo -n "."
        sleep 1
        attempt=$((attempt + 1))
    done
    
    print_warning "$name health check timed out"
    return 1
}

# Check backend health
check_health "http://localhost:$BACKEND_PORT/health" "Backend"

# Check frontend (just verify it's responding)
if curl -s "http://localhost:$FRONTEND_PORT" > /dev/null 2>&1; then
    print_status "Frontend is responding"
else
    print_warning "Frontend may still be starting..."
fi

echo ""

# ============================================================================
# MONITORING
# ============================================================================
print_section "Service Logs"

echo -e "${BLUE}Backend Log:${NC}    tail -f /tmp/lynko-backend.log"
echo -e "${BLUE}Frontend Log:${NC}   tail -f /tmp/lynko-frontend.log"
echo ""

# Wait for processes
wait
